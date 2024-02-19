import { CHAT_QUERY, Data, PREFIX } from './query';

import {
  ChatInput,
  GraphQlInput,
  useCustomQuery,
  UseQueryWrapper,
} from '$shared';

export type UseChat = UseQueryWrapper<
  typeof PREFIX,
  Data,
  GraphQlInput<ChatInput>
>;

export const useChat: UseChat = (...args) =>
  useCustomQuery(PREFIX, CHAT_QUERY, ...args);
