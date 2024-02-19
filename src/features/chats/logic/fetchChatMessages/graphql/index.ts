import { ChatMessagesData, PREFIX, QUERY } from './query';

import { MessagesInput, useCustomQuery, UseQueryWrapper } from '$shared';

export type UseChatMessages = UseQueryWrapper<
  typeof PREFIX,
  ChatMessagesData,
  { input: MessagesInput }
>;

export const useChatMessages: UseChatMessages = (...args) =>
  useCustomQuery(PREFIX, QUERY, ...args);
