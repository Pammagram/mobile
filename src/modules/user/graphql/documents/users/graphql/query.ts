import { InferSelection } from 'gql-ts-builder';

import { createUsers } from '$modules/user/graphql/builders';

export const USERS_PREFIX = 'users';

export const USERS_QUERY = createUsers({
  data: {
    id: true,
    lastActiveInMs: true,
    phoneNumber: true,
    username: true,
  },
});

export type Data = InferSelection<typeof USERS_QUERY>;
