import { InferSelection } from 'gql-ts-builder';

import { createSendMessage } from '../../builders';

export const SEND_MESSAGE_PREFIX = 'sendMessage';

export const SEND_MESSAGE_MUTATION = createSendMessage({
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

export type SendMessageData = InferSelection<typeof SEND_MESSAGE_MUTATION>;
