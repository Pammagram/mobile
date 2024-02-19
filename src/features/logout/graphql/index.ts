import { OperationVariables } from '@apollo/client';

import { Data, MUTATION, PREFIX } from './mutation';

import { useCustomMutation, UseMutationWrapper } from '$shared';

export type UseLogout = UseMutationWrapper<
  typeof PREFIX,
  Data,
  OperationVariables
>;

export const useLogout: UseLogout = (...args) =>
  useCustomMutation(PREFIX, MUTATION, ...args);
