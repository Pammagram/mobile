import { CHATS_PREFIX, CHATS_QUERY, ChatsData } from './query';

import { ChatsInput, useCustomQuery, UseQueryWrapper } from '$shared';

export * from './query';

export type UseChats = UseQueryWrapper<
  typeof CHATS_PREFIX,
  ChatsData,
  { input: ChatsInput }
>;

export const useChats: UseChats = (...args) =>
  useCustomQuery(CHATS_PREFIX, CHATS_QUERY, ...args);
