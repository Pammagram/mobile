import { createChat } from '$entities';
import { InferSelection } from '$shared';

export const CHAT_PREFIX = 'chat';

export const CHAT_OUTPUT_TYPE_NAME = 'ChatOutput';

export const CHAT_TYPE_NAME = 'ChatDto';

export const CHAT_QUERY = createChat({
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

export type ChatData = InferSelection<typeof CHAT_QUERY>;
