import { MUTATION, PREFIX } from './mutation';

import {
  AddMessageInput,
  AddMessageOutput,
  GraphQlInput,
  useCustomMutation,
  UseMutationWrapper,
} from '$shared';

export type UseAddMessage = UseMutationWrapper<
  typeof PREFIX,
  AddMessageOutput,
  GraphQlInput<AddMessageInput>
>;

export const useAddMessage: UseAddMessage = (...args) =>
  useCustomMutation(PREFIX, MUTATION, ...args);
