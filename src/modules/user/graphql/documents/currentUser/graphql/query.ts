import { InferSelection } from 'gql-ts-builder';

import { createMe } from '$modules/user/graphql/builders';

export const PREFIX = 'me';

export const QUERY = createMe({
  data: { id: true, lastActiveInMs: true, phoneNumber: true, username: true },
});

export type Data = InferSelection<typeof QUERY>;
