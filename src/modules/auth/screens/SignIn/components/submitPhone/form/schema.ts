import { object } from 'yup';

import { phoneSchema } from '$entities';

export const schema = object({
  phone: phoneSchema.required(),
});
