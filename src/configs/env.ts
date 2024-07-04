import { mixed, object, string } from 'yup';

import { NodeEnv } from './constants';

const schema = object({
  //* API
  API_URL: string().required(),

  //* Other
  NODE_ENV: mixed<NodeEnv>().oneOf(Object.values(NodeEnv)).required(),
});

export const envVariables = schema.validateSync({
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
});
