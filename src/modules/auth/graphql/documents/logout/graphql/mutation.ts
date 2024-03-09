import { InferSelection } from 'gql-ts-builder';

import { createLogout } from '$modules/user/graphql';

export const PREFIX = 'logout';

export const MUTATION = createLogout({
  data: true,
});

export type Data = InferSelection<typeof MUTATION>;
