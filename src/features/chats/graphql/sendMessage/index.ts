import { ADD_MESSAGE_MUTATION, ADD_MESSAGE_PREFIX } from './mutation';

import {
  AddMessageInput,
  AddMessageOutput,
  GraphQlInput,
  useCustomMutation,
  UseMutationWrapper,
} from '$shared';

export * from './mutation';

export type UseAddMessage = UseMutationWrapper<
  typeof ADD_MESSAGE_PREFIX,
  AddMessageOutput,
  GraphQlInput<AddMessageInput>
>;

export const useAddMessage: UseAddMessage = (...args) =>
  useCustomMutation(ADD_MESSAGE_PREFIX, ADD_MESSAGE_MUTATION, ...args);
