import { ChatMessagesData, PREFIX, QUERY } from './query';

import {
  MessagesInput,
  useCustomLazyQuery,
  UseLazyQueryWrapper,
} from '$shared';

export type UseChatMessages = UseLazyQueryWrapper<
  typeof PREFIX,
  ChatMessagesData,
  { input: MessagesInput }
>;

export const useChatMessages: UseChatMessages = (...args) =>
  useCustomLazyQuery(PREFIX, QUERY, ...args);
