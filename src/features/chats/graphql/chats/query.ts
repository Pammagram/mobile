import { createChats } from '$entities';
import { InferSelection } from '$shared';

export const CHATS_PREFIX = 'chats';

export const CHATS_QUERY = createChats({
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

export type ChatsData = InferSelection<typeof CHATS_QUERY>;
