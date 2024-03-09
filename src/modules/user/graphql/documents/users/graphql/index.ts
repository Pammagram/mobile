import { Data, USERS_PREFIX, USERS_QUERY } from './query';

import { useCustomQuery, UseQueryWrapper } from '$core/apollo';
import { MutationUpdateMeArgs } from '$core/graphql';

export type UseUsers = UseQueryWrapper<
  typeof USERS_PREFIX,
  Data,
  MutationUpdateMeArgs
>;

export const useUsers: UseUsers = (...args) =>
  useCustomQuery(USERS_PREFIX, USERS_QUERY, ...args);
