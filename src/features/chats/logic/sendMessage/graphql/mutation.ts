import { createAddMessage } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'addMessage';

export const MUTATION = createAddMessage({
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

export type AddMessageData = InferSelection<typeof MUTATION>;
