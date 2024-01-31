import { object, string } from 'yup';

import { ValidationHints } from '$shared';

export const schema = object({
  username: string().required(ValidationHints.REQUIRED),
});
