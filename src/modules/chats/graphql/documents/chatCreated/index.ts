import {
  CHAT_CREATED_PREFIX,
  CHAT_CREATED_SUBSCRIPTION,
  ChatCreatedData,
} from './subscription';

import { useCustomSubscription, UseSubscriptionWrapper } from '$core/apollo';

export * from './subscription';

export type UseChatCreated = UseSubscriptionWrapper<
  typeof CHAT_CREATED_PREFIX,
  ChatCreatedData,
  never
>;

export const useChatCreated: UseChatCreated = (...args) =>
  useCustomSubscription(
    CHAT_CREATED_PREFIX,
    CHAT_CREATED_SUBSCRIPTION,
    ...args,
  );
