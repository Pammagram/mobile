import { object, string } from 'yup';

import { ValidationHints } from '../../../validation';

export const schema = object({
  username: string().required(ValidationHints.REQUIRED),
});
