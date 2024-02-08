import { Data, PREFIX, QUERY } from './query';

import {
  MessagesInput,
  useCustomLazyQuery,
  UseLazyQueryWrapper,
} from '$shared';

export type UseChatMessages = UseLazyQueryWrapper<
  typeof PREFIX,
  Data,
  { input: MessagesInput }
>;

export const useChatMessages: UseChatMessages = (...args) =>
  useCustomLazyQuery(PREFIX, QUERY, ...args);
