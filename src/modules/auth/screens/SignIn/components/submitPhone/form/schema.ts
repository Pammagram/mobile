import { object } from 'yup';

import { phoneSchema } from '../../../phone';

export const schema = object({
  phone: phoneSchema.required(),
});
