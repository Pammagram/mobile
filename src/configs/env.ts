import { API_URL, NODE_ENV } from '@env';
import { mixed, object, string } from 'yup';

import { NodeEnv } from './constants';

const schema = object({
  //* API
  API_URL: string().required(),

  //* Other
  NODE_ENV: mixed<NodeEnv>().oneOf(Object.values(NodeEnv)).required(),
});

export const envVariables = schema.validateSync({
  API_URL,
  NODE_ENV,
});
