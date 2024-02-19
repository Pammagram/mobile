import { Data, MUTATION, PREFIX } from './mutation';

import { useCustomMutation, UseMutationWrapper } from '$shared';

export type UseLogout = UseMutationWrapper<typeof PREFIX, Data, {}>;

export const useLogout: UseLogout = (...args) =>
  useCustomMutation(PREFIX, MUTATION, ...args);
