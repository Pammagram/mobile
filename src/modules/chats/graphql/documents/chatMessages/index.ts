import {
  CHAT_MESSAGES_PREFIX,
  CHAT_MESSAGES_QUERY,
  ChatMessagesData,
} from './query';

import { GraphQlInput, useCustomQuery, UseQueryWrapper } from '$core/apollo';
import { MessagesInput } from '$core/graphql';

export * from './query';

export type UseChatMessages = UseQueryWrapper<
  typeof CHAT_MESSAGES_PREFIX,
  ChatMessagesData,
  GraphQlInput<MessagesInput>
>;

export const useChatMessages: UseChatMessages = (...args) =>
  useCustomQuery(CHAT_MESSAGES_PREFIX, CHAT_MESSAGES_QUERY, ...args);
