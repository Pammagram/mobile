import {
  MESSAGE_ADDED_PREFIX,
  MessageAddedData,
  MESSAGES_SUBSCRIPTION,
} from './subscription';

import { useCustomSubscription, UseSubscriptionWrapper } from '$shared';

export * from './subscription';

export type UseChatMessageAdded = UseSubscriptionWrapper<
  typeof MESSAGE_ADDED_PREFIX,
  MessageAddedData,
  never
>;

export const useChatMessageAdded: UseChatMessageAdded = (...args) =>
  useCustomSubscription(MESSAGE_ADDED_PREFIX, MESSAGES_SUBSCRIPTION, ...args);
