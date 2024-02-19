import { createChatMessages } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'chatMessages';

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
    text: true,
  },
});

export type ChatMessagesData = InferSelection<typeof CHAT_MESSAGES_QUERY>;

export type ChatMessage = ChatMessagesData['data'][0];
