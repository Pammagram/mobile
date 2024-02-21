import {
  CHAT_MESSAGES_PREFIX,
  CHAT_MESSAGES_QUERY,
  ChatMessagesData,
} from './query';

import { MessagesInput, useCustomQuery, UseQueryWrapper } from '$shared';

export * from './query';

export type UseChatMessages = UseQueryWrapper<
  typeof CHAT_MESSAGES_PREFIX,
  ChatMessagesData,
  { input: MessagesInput }
>;

export const useChatMessages: UseChatMessages = (...args) =>
  useCustomQuery(CHAT_MESSAGES_PREFIX, CHAT_MESSAGES_QUERY, ...args);
