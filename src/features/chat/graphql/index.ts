import { Data, PREFIX, QUERY } from './query';

import { ChatInput, useCustomQuery, UseQueryWrapper } from '$shared';

export type UseChat = UseQueryWrapper<
  typeof PREFIX,
  Data,
  { input: ChatInput }
>;

export const useChat: UseChat = (...args) =>
  useCustomQuery(PREFIX, QUERY, ...args);
