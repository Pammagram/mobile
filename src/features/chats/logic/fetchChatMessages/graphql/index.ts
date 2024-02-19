import { CHAT_MESSAGES_QUERY, ChatMessagesData, PREFIX } from './query';

import { MessagesInput, useCustomQuery, UseQueryWrapper } from '$shared';

export type UseChatMessages = UseQueryWrapper<
  typeof PREFIX,
  ChatMessagesData,
  { input: MessagesInput }
>;

export const useChatMessages: UseChatMessages = (...args) =>
  useCustomQuery(PREFIX, CHAT_MESSAGES_QUERY, ...args);
