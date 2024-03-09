import { CHAT_PREFIX, CHAT_QUERY, ChatData } from './query';

import {
  ChatInput,
  GraphQlInput,
  useCustomQuery,
  UseQueryWrapper,
} from '$shared';

export * from './query';

export type UseChat = UseQueryWrapper<
  typeof CHAT_PREFIX,
  ChatData,
  GraphQlInput<ChatInput>
>;

export const useChat: UseChat = (...args) =>
  useCustomQuery(CHAT_PREFIX, CHAT_QUERY, ...args);
