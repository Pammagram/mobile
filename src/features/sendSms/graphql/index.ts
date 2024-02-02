import { Data, MUTATION, PREFIX } from './mutation';

import {
  MutationSendSmsArgs,
  useCustomMutation,
  UseMutationWrapper,
} from '$shared';

export type UseSendSms = UseMutationWrapper<
  typeof PREFIX,
  Data,
  MutationSendSmsArgs
>;

export const useSendSms: UseSendSms = (...args) =>
  useCustomMutation(PREFIX, MUTATION, ...args);
