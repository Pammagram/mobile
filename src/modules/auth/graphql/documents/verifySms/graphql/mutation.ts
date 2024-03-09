import { InferSelection } from 'gql-ts-builder';

import { createVerifySms } from '$modules/auth/graphql/builders';

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
