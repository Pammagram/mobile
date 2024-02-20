import { FieldFunctionOptions, TypePolicies } from '@apollo/client';
import {
  CHAT_MESSAGES_QUERY,
  ChatMessagesData,
} from 'features/chats/logic/fetchChatMessages/graphql/query';
import { MessageAddedData } from 'features/chats/logic/subscribeToChatMessages/graphql/subscription';
import { DeepPartial } from 'utility-types';

import { logPrettied } from '$core/utils';
import {
  ChatInput,
  ChatOutput,
  GraphQlInput,
  GraphQlResponse,
  MessagesInput,
  MessagesOutput,
} from '$shared';

const MESSAGES_TYPE_NAME = 'MessagesOutput';
const CHAT_OUTPUT_TYPE_NAME = 'ChatOutput';
const CHAT_TYPE_NAME = 'ChatDto';

// TODO separate adequately across features
export const customTypePolicies: TypePolicies[] = [
  {
    [MESSAGES_TYPE_NAME]: {
      merge: true,
      keyFields: ['chatId'],
    },

    Query: {
      fields: {
        chat: {
          read: (
            _existing: ChatOutput,
            options: FieldFunctionOptions<
              GraphQlInput<ChatInput>,
              GraphQlInput<ChatInput>
            >,
          ) => {
            const { variables, toReference } = options;
            const chatId = variables?.input.id;

            const chatReference = toReference({
              __typename: CHAT_TYPE_NAME,
              id: chatId,
            });

            return {
              __typename: CHAT_OUTPUT_TYPE_NAME,
              data: chatReference,
            } satisfies DeepPartial<ChatOutput>;
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
                      chatId: message.chat.id, // TODO extract id
                    },
                  },
                },
                (data) => {
                  if (!data?.response) {
                    return undefined;
                  }

                  // TODO handle case when no chat exist
                  return {
                    response: {
                      chatId: message.chat.id,
                      data: [...(data?.response.data || []), message],
                    },
                  };
                },
              );
            } catch (error) {
              logPrettied(error);
            }
          },
        },
      },
    },
  },
];
