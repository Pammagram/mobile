import {
  REMOVE_CHAT_MUTATION,
  REMOVE_CHAT_PREFIX,
  RemoveChatData,
} from './mutation';

import {
  GraphQlInput,
  useCustomMutation,
  UseMutationWrapper,
} from '$core/apollo';
import { RemoveChatInput } from '$core/graphql';

export * from './mutation';

export type UseRemoveChat = UseMutationWrapper<
  typeof REMOVE_CHAT_PREFIX,
  RemoveChatData,
  GraphQlInput<RemoveChatInput>
>;

export const useRemoveChat: UseRemoveChat = (...args) =>
  useCustomMutation(REMOVE_CHAT_PREFIX, REMOVE_CHAT_MUTATION, ...args);
