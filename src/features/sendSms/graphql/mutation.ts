import { createSendSms } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'sendSms';

export const MUTATION = createSendSms({
  __typename: true,
  data: true,
});

export type Data = InferSelection<typeof MUTATION>;
