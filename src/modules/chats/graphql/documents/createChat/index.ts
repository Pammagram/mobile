import {
  CREATE_CHAT_MUTATION,
  CREATE_CHAT_PREFIX,
  CreateChatData,
} from './mutation';

import {
  CreateChatInput,
  GraphQlInput,
  useCustomMutation,
  UseMutationWrapper,
} from '$shared';

export * from './mutation';

export type UseCreateChat = UseMutationWrapper<
  typeof CREATE_CHAT_PREFIX,
  CreateChatData,
  GraphQlInput<CreateChatInput>
>;

export const useCreateChat: UseCreateChat = (...args) =>
  useCustomMutation(CREATE_CHAT_PREFIX, CREATE_CHAT_MUTATION, ...args);
