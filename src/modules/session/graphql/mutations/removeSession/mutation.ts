import { InferSelection } from 'gql-ts-builder';

import { createRemoveSession } from './builder';

import { useCustomMutation, UseMutationWrapper } from '$core/apollo';
import { MutationRemoveSessionArgs } from '$core/graphql';

const PREFIX = 'removeSession';

export const REMOVE_SESSION_MUTATION = createRemoveSession({
  data: {
    id: true,
    device: true,
    ip: true,
    lastVisitInMs: true,
  },
});

export type RemoveSessionData = InferSelection<typeof REMOVE_SESSION_MUTATION>;

export type UseRemoveSession = UseMutationWrapper<
  typeof PREFIX,
  RemoveSessionData,
  MutationRemoveSessionArgs
>;

export const useRemoveSession: UseRemoveSession = (...args) =>
  useCustomMutation(PREFIX, REMOVE_SESSION_MUTATION, ...args);
