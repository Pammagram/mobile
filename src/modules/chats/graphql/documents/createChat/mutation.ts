import { InferSelection } from 'gql-ts-builder';

import { createCreateChat } from '../../builders';

export const CREATE_CHAT_PREFIX = 'createChat';

export const CREATE_CHAT_MUTATION = createCreateChat({
  data: {
    id: true,
    members: {
      id: true,
      lastActiveInMs: true,
      phoneNumber: true,
      username: true,
    },
    title: true,
    type: true,
  },
});

export type CreateChatData = InferSelection<typeof CREATE_CHAT_MUTATION>;
