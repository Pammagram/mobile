import { Data, MUTATION, PREFIX } from './mutation';

import { useCustomMutation, UseMutationWrapper } from '$core/apollo';
import { MutationVerifySmsArgs } from '$core/graphql';

export type UseVerifySms = UseMutationWrapper<
  typeof PREFIX,
  Data,
  MutationVerifySmsArgs
>;

export const useVerifySms: UseVerifySms = (...args) =>
  useCustomMutation(PREFIX, MUTATION, ...args);
