import { CHAT_PREFIX, CHAT_QUERY, ChatData } from './query';

import { GraphQlInput, useCustomQuery, UseQueryWrapper } from '$core/apollo';
import { ChatInput } from '$core/graphql';

export * from './query';

export type UseChat = UseQueryWrapper<
  typeof CHAT_PREFIX,
  ChatData,
  GraphQlInput<ChatInput>
>;

export const useChat: UseChat = (...args) =>
  useCustomQuery(CHAT_PREFIX, CHAT_QUERY, ...args);
