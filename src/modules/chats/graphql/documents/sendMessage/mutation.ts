import { InferSelection } from 'gql-ts-builder';

import { createAddMessage } from '$modules/chats/graphql/builders';

export const ADD_MESSAGE_PREFIX = 'addMessage';

export const ADD_MESSAGE_MUTATION = createAddMessage({
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

export type AddMessageData = InferSelection<typeof ADD_MESSAGE_MUTATION>;
