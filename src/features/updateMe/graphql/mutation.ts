import { createUpdateMe } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'updateMe';

export const MUTATION = createUpdateMe({
  data: {
    id: true,
    lastActiveInMs: true,
    phoneNumber: true,
    username: true,
  },
});

export type Data = InferSelection<typeof MUTATION>;
