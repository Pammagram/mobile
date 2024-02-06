import { createChat } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'chat';

export const QUERY = createChat({
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

export type Data = InferSelection<typeof QUERY>;
