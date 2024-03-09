import {
  CHAT_REMOVED_PREFIX,
  CHAT_REMOVED_SUBSCRIPTION,
  ChatRemovedData,
} from './subscription';

import { useCustomSubscription, UseSubscriptionWrapper } from '$core/apollo';

export * from './subscription';

export type UseChatRemoved = UseSubscriptionWrapper<
  typeof CHAT_REMOVED_PREFIX,
  ChatRemovedData,
  never
>;

export const useChatRemoved: UseChatRemoved = (...args) =>
  useCustomSubscription(
    CHAT_REMOVED_PREFIX,
    CHAT_REMOVED_SUBSCRIPTION,
    ...args,
  );
