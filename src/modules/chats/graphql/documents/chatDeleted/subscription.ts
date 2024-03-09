import { createChatRemoved } from '$entities';
import { InferSelection } from '$shared';

export const CHAT_REMOVED_PREFIX = 'chatRemoved';

export const CHAT_REMOVED_SUBSCRIPTION = createChatRemoved({
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

export type ChatRemovedData = InferSelection<typeof CHAT_REMOVED_SUBSCRIPTION>;
