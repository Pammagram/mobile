import { InferSelection } from 'gql-ts-builder';

import { createUpdateMe } from '$modules/user/graphql/builders';

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
