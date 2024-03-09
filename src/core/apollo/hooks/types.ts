import { DEFAULT_INPUT_NAME, DEFAULT_RESPONSE_NAME } from '../constants';

export type GraphQlResponse<Data> = Record<typeof DEFAULT_RESPONSE_NAME, Data>;

export type GraphQlInput<Variables> = Record<
  typeof DEFAULT_INPUT_NAME,
  Variables
>;
