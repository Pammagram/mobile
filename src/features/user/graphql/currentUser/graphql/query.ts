import { createMe } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'me';

export const QUERY = createMe({
  data: { id: true, lastActiveInMs: true, phoneNumber: true, username: true },
});

export type Data = InferSelection<typeof QUERY>;
