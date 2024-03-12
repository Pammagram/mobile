import { InferSelection } from 'gql-ts-builder';

import { createMySessions } from './builder';

import { useCustomQuery, UseQueryWrapper } from '$core/apollo';

const PREFIX = 'mySessions';

export const MY_SESSIONS_QUERY = createMySessions({
  data: {
    id: true,
    device: true,
    ip: true,
    lastVisitInMs: true,
  },
});

export type MySessionsData = InferSelection<typeof MY_SESSIONS_QUERY>;

export type UseMySessions = UseQueryWrapper<
  typeof PREFIX,
  MySessionsData,
  never
>;

export const useMySessions: UseMySessions = (...args) =>
  useCustomQuery(PREFIX, MY_SESSIONS_QUERY, ...args);
