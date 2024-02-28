import { FieldFunctionOptions, Reference, TypePolicies } from '@apollo/client';

import { logPrettied } from '$core/utils';
import {
  CHAT_MESSAGES_QUERY,
  CHAT_OUTPUT_TYPE_NAME,
  CHAT_TYPE_NAME,
  ChatMessagesData,
  ChatRemovedData,
  MessageAddedData,
  MESSAGES_OUTPUT_TYPE_NAME,
} from '$features';
import {
  ChatDto,
  ChatInput,
  ChatOutput,
  GraphQlInput,
  GraphQlResponse,
  MessagesInput,
  MessagesOutput,
} from '$shared';

// TODO separate adequately across features
export const customTypePolicies: TypePolicies[] = [
  {
    [MESSAGES_OUTPUT_TYPE_NAME]: {
      merge: true,
      keyFields: ['chatId'],
    },
    // TODO move to chats feature
    Query: {
      fields: {
        chat: {
          read: (
            _existing: ChatOutput,
            options: FieldFunctionOptions<Record<string, unknown>>,
          ) => {
            const { toReference } = options;

            const variables = options.variables as GraphQlInput<ChatInput>;

            const chatReference = toReference({
              __typename: CHAT_TYPE_NAME,
              id: variables.input.id,
            }) as unknown as ChatDto;

            // * Imitate chat output dto by referencing chats output
            return {
              __typename: CHAT_OUTPUT_TYPE_NAME,
              data: chatReference,
            } satisfies ChatOutput;
          },
        },
      },
    },

    Subscription: {
      fields: {
        messageAdded: {
          merge: (
            _existing: MessagesOutput,
            incoming: MessageAddedData,
            options,
          ) => {
            try {
              const { cache, readField } = options;

              const messageRef = incoming.data;

              // TODO workaround, figure out way of doing it the proper way
              // * The problem is that incoming data is already cached and arrives as ref, we need to extract this whole object to update query

              const message = {
                id: readField('id', messageRef) as number,
                chat: {
                  id: readField('id', readField('chat', messageRef)) as number,
                },
                sender: {
                  id: readField(
                    'id',
                    readField('sender', messageRef),
                  ) as number,
                  username: readField(
                    'username',
                    readField('sender', messageRef),
                  ),
                },
                createdAt: readField('createdAt', messageRef) as string,
                updatedAt: readField('updatedAt', messageRef) as string,
                text: readField('text', messageRef) as string,
              } satisfies ChatMessagesData['data'][0];

              cache.updateQuery<
                GraphQlResponse<ChatMessagesData>,
                GraphQlInput<MessagesInput>
              >(
                {
                  query: CHAT_MESSAGES_QUERY,
                  variables: {
                    input: {
                      chatId: message.chat.id,
                    },
                  },
                },
                (data) => {
                  if (!data?.response) {
                    return;
                  }

                  const messageAlreadyExists = data?.response.data.find(
                    (existingMessage) => existingMessage.id === message.id,
                  );

                  if (messageAlreadyExists) {
                    return;
                  }

                  const updatedMessages = [...data.response.data, message];

                  // TODO handle case when no chat exist
                  return {
                    response: {
                      chatId: message.chat.id,
                      data: updatedMessages,
                    },
                  };
                },
              );
            } catch (error) {
              logPrettied(error);
            }
          },
        },
        chatRemoved: {
          merge: (_existing: unknown, incoming: ChatRemovedData, options) => {
            const { cache, canRead } = options;

            const chatId = (incoming.data as unknown as Reference).__ref;

            if (
              !canRead({
                __ref: chatId,
              })
            ) {
              return;
            }

            cache.evict({ id: chatId });
            cache.gc();
          },
        },
      },
    },
  },
];
