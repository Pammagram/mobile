import { createChatMessagesSubscription } from '$entities';
import { InferSelection } from '$shared';

export const MESSAGE_ADDED_PREFIX = 'messageAdded';

export const MESSAGES_SUBSCRIPTION = createChatMessagesSubscription({
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

export type MessageAddedData = InferSelection<typeof MESSAGES_SUBSCRIPTION>;
