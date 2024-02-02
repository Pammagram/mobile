import { Data, MUTATION, PREFIX } from './mutation';

import {
  MutationVerifySmsArgs,
  useCustomMutation,
  UseMutationWrapper,
} from '$shared';

export type UseVerifySms = UseMutationWrapper<
  typeof PREFIX,
  Data,
  MutationVerifySmsArgs
>;

export const useVerifySms: UseVerifySms = (...args) =>
  useCustomMutation(PREFIX, MUTATION, ...args);
