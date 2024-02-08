import { createChatMessagesSubscription } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'messageAdded';

export const SUBSCRIPTION = createChatMessagesSubscription({
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

export type MessageAddedData = InferSelection<typeof SUBSCRIPTION>;
