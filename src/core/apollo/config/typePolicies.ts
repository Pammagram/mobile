import { TypePolicies } from '@apollo/client';
import {
  ChatMessagesData,
  QUERY,
} from 'features/chats/fetchChatMessages/graphql/query';
import { MessageAddedData } from 'features/chats/subscribeToChatMessages/graphql/subscription';

import { logPrettied } from '$core/utils';
import {
  GraphQlInput,
  GraphQlResponse,
  MessagesInput,
  MessagesOutput,
} from '$shared';

const MESSAGES_TYPE_NAME = 'MessagesOutput';

export const customTypePolicies: TypePolicies[] = [
  {
    [MESSAGES_TYPE_NAME]: {
      merge: true,
      keyFields: ['chatId'],
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
                text: readField('text', messageRef) as string,
              } satisfies ChatMessagesData['data'][0];

              cache.updateQuery<
                GraphQlResponse<ChatMessagesData>,
                GraphQlInput<MessagesInput>
              >(
                {
                  query: QUERY,
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
