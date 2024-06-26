import { InferSelection } from 'gql-ts-builder';

import { createChatCreated } from '../../builders';

export const CHAT_CREATED_PREFIX = 'chatCreated';

export const CHAT_CREATED_SUBSCRIPTION = createChatCreated({
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

export type ChatCreatedData = InferSelection<typeof CHAT_CREATED_SUBSCRIPTION>;
