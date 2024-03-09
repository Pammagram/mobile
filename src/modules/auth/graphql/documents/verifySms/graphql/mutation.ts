import { createVerifySms } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'verifySms';

export const MUTATION = createVerifySms({
  data: {
    id: true,
    lastActiveInMs: true,
    phoneNumber: true,
    username: true,
  },
});

export type Data = InferSelection<typeof MUTATION>;
