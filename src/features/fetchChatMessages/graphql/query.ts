import { createChatMessages } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'chatMessages';

export const QUERY = createChatMessages({
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

export type Data = InferSelection<typeof QUERY>;
