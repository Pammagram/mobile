import { InferSelection } from 'gql-ts-builder';

import { createChatMessagesSubscription } from '../../builders';

export const MESSAGE_ADDED_PREFIX = 'messageAdded';

export const MESSAGE_ADDED_SUBSCRIPTION = createChatMessagesSubscription({
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

export type MessageAddedData = InferSelection<
  typeof MESSAGE_ADDED_SUBSCRIPTION
>;
