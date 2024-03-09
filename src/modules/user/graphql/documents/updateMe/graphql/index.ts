import { Data, MUTATION, PREFIX } from './mutation';

import { useCustomMutation, UseMutationWrapper } from '$core/apollo';
import { MutationUpdateMeArgs } from '$core/graphql';

export type UseUpdateMe = UseMutationWrapper<
  typeof PREFIX,
  Data,
  MutationUpdateMeArgs
>;

export const useUpdateMe: UseUpdateMe = (...args) =>
  useCustomMutation(PREFIX, MUTATION, ...args);
