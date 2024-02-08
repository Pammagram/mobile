import { createChatMessages } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'chatMessages';

export const QUERY = createChatMessages({
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

export type ChatMessagesData = InferSelection<typeof QUERY>;
