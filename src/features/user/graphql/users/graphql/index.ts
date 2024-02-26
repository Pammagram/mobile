import { Data, USERS_PREFIX, USERS_QUERY } from './query';

import { MutationUpdateMeArgs, useCustomQuery, UseQueryWrapper } from '$shared';

export type UseUsers = UseQueryWrapper<
  typeof USERS_PREFIX,
  Data,
  MutationUpdateMeArgs
>;

export const useUsers: UseUsers = (...args) =>
  useCustomQuery(USERS_PREFIX, USERS_QUERY, ...args);
