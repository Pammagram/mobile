import { Data, MUTATION, PREFIX } from './mutation';

import {
  MutationUpdateMeArgs,
  useCustomMutation,
  UseMutationWrapper,
} from '$shared';

export type UseUpdateMe = UseMutationWrapper<
  typeof PREFIX,
  Data,
  MutationUpdateMeArgs
>;

export const useUpdateMe: UseUpdateMe = (...args) =>
  useCustomMutation(PREFIX, MUTATION, ...args);
