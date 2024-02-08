import { Data, PREFIX, SUBSCRIPTION } from './subscription';

import { useCustomSubscription, UseSubscriptionWrapper } from '$shared';

export type UseChatMessageAdded = UseSubscriptionWrapper<
  typeof PREFIX,
  Data,
  never
>;

export const useChatMessageAdded: UseChatMessageAdded = (...args) =>
  useCustomSubscription(PREFIX, SUBSCRIPTION, ...args);
