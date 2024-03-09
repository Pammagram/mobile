import { Data, MUTATION, PREFIX } from './mutation';

import { useCustomMutation, UseMutationWrapper } from '$core/apollo';
import { MutationSendSmsArgs } from '$core/graphql';

export type UseSendSms = UseMutationWrapper<
  typeof PREFIX,
  Data,
  MutationSendSmsArgs
>;

export const useSendSms: UseSendSms = (...args) =>
  useCustomMutation(PREFIX, MUTATION, ...args);
