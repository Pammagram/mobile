import { parsePhoneNumber } from 'libphonenumber-js';
import { string } from 'yup';

import { ValidationHints } from '$shared';

export const phoneSchema = string().test(
  'is-phone-valid',
  ValidationHints.PHONE_NUMBER,
  (phone) => {
    try {
      return parsePhoneNumber(phone ?? '')?.isValid();
    } catch {
      return false;
    }
  },
);
