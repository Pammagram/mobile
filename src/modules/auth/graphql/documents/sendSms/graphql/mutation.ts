import { InferSelection } from 'gql-ts-builder';

import { createSendSms } from '$modules/auth/graphql/builders';

export const PREFIX = 'sendSms';

export const MUTATION = createSendSms({
  data: true,
});

export type Data = InferSelection<typeof MUTATION>;
