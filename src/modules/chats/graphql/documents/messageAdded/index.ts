import {
  MESSAGE_ADDED_PREFIX,
  MESSAGE_ADDED_SUBSCRIPTION,
  MessageAddedData,
} from './subscription';

import { useCustomSubscription, UseSubscriptionWrapper } from '$core/apollo';

export * from './subscription';

export type UseChatMessageAdded = UseSubscriptionWrapper<
  typeof MESSAGE_ADDED_PREFIX,
  MessageAddedData,
  never
>;

export const useChatMessageAdded: UseChatMessageAdded = (...args) =>
  useCustomSubscription(
    MESSAGE_ADDED_PREFIX,
    MESSAGE_ADDED_SUBSCRIPTION,
    ...args,
  );
