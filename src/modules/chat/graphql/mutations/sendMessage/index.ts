import { SEND_MESSAGE_MUTATION, SEND_MESSAGE_PREFIX } from './mutation';

import {
  GraphQlInput,
  useCustomMutation,
  UseMutationWrapper,
} from '$core/apollo';
import { SendMessageInput, SendMessageOutput } from '$core/graphql';

export * from './mutation';

export type UseSendMessage = UseMutationWrapper<
  typeof SEND_MESSAGE_PREFIX,
  SendMessageOutput,
  GraphQlInput<SendMessageInput>
>;

export const useSendMessage: UseSendMessage = (...args) =>
  useCustomMutation(SEND_MESSAGE_PREFIX, SEND_MESSAGE_MUTATION, ...args);
