import { createSendSms } from '$entities';
import { InferSelection } from 'gql-ts-builder';

export const PREFIX = 'sendSms';

export const MUTATION = createSendSms({
  data: true,
});

export type Data = InferSelection<typeof MUTATION>;
