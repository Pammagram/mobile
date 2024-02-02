import { object, string } from 'yup';

import { CODE_LENGTH } from '../configs';

import { ValidationHints } from '$shared';

export const schema = object({
  code: string()
    .length(CODE_LENGTH, ValidationHints.CODE)
    .required(ValidationHints.REQUIRED),
});
