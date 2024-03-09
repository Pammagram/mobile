import { InferSelection } from 'gql-ts-builder';

import { createChatMessages } from '../../builders';

export const CHAT_MESSAGES_PREFIX = 'chatMessages';

export const MESSAGES_OUTPUT_TYPE_NAME = 'MessagesOutput';

export const CHAT_MESSAGES_QUERY = createChatMessages({
  chatId: true,
  data: {
    id: true,
    sender: {
      id: true,
      username: true,
    },
    chat: {
      id: true,
    },
    createdAt: true,
    updatedAt: true,
    text: true,
  },
});

export type ChatMessagesData = InferSelection<typeof CHAT_MESSAGES_QUERY>;

export type ChatMessage = ChatMessagesData['data'][0];
