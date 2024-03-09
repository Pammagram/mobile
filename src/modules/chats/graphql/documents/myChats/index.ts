import { CHATS_PREFIX, CHATS_QUERY, ChatsData } from './query';

import { GraphQlInput, useCustomQuery, UseQueryWrapper } from '$core/apollo';
import { ChatsInput } from '$core/graphql';

export * from './query';

export type UseMyChats = UseQueryWrapper<
  typeof CHATS_PREFIX,
  ChatsData,
  GraphQlInput<ChatsInput>
>;

export const useMyChats: UseMyChats = (...args) =>
  useCustomQuery(CHATS_PREFIX, CHATS_QUERY, ...args);
