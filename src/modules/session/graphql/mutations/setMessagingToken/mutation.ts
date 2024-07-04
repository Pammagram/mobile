import { InferSelection } from 'gql-ts-builder';

import { createSetMessagingToken } from './builder';

import { useCustomMutation, UseMutationWrapper } from '$core/apollo';
import { MutationSetMessagingTokenArgs } from '$core/graphql';

const PREFIX = 'setMessagingToken';

export const mutation = createSetMessagingToken({
  data: true,
});

export type SetMessagingData = InferSelection<typeof mutation>;

export type UseSetMessagingToken = UseMutationWrapper<
  typeof PREFIX,
  SetMessagingData,
  MutationSetMessagingTokenArgs
>;

export const useSetMessagingToken: UseSetMessagingToken = (...args) =>
  useCustomMutation(PREFIX, mutation, ...args);
