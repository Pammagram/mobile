import { InferSelection } from 'gql-ts-builder';

import { createMyChats } from '../../builders';

export const CHATS_PREFIX = 'myChats';

export const CHATS_QUERY = createMyChats({
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
    lastMessage: {
      id: true,
      createdAt: true,
      sender: {
        username: true,
      },
      text: true,
    },
  },
});

export type ChatsData = InferSelection<typeof CHATS_QUERY>;
