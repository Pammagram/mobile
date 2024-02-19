import { CHATS_QUERY, ChatsData, PREFIX } from './query';

import { ChatsInput, useCustomQuery, UseQueryWrapper } from '$shared';

export type UseChats = UseQueryWrapper<
  typeof PREFIX,
  ChatsData,
  { input: ChatsInput }
>;

export const useChats: UseChats = (...args) =>
  useCustomQuery(PREFIX, CHATS_QUERY, ...args);
