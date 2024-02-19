import { createChats } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'chats';

export const QUERY = createChats({
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

export type ChatsData = InferSelection<typeof QUERY>;