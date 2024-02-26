import { CHATS_PREFIX, CHATS_QUERY, ChatsData } from './query';

import {
  ChatsInput,
  GraphQlInput,
  useCustomQuery,
  UseQueryWrapper,
} from '$shared';

export * from './query';

export type UseMyChats = UseQueryWrapper<
  typeof CHATS_PREFIX,
  ChatsData,
  GraphQlInput<ChatsInput>
>;

export const useMyChats: UseMyChats = (...args) =>
  useCustomQuery(CHATS_PREFIX, CHATS_QUERY, ...args);
