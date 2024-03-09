import { object, string } from 'yup';

import { ValidationHints } from '../../../validation';
import { CODE_LENGTH } from '../configs';

export const schema = object({
  code: string()
    .length(CODE_LENGTH, ValidationHints.CODE)
    .required(ValidationHints.REQUIRED),
});
