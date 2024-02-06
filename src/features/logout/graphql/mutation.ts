import { createLogout } from '$entities';
import { InferSelection } from '$shared';

export const PREFIX = 'logout';

export const MUTATION = createLogout({
  data: true,
});

export type Data = InferSelection<typeof MUTATION>;
