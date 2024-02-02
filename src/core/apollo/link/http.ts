import { ApolloLink } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

import { apolloConfig } from '../config';

import { serverConfig } from '$configs';

export const createHttpLink = (): ApolloLink => {
  const { batchMax, batchInterval } = apolloConfig;
  const { apiUrl: uri } = serverConfig;

  return new BatchHttpLink({
    uri,
    batchMax, // No more than N operations per batch
    batchInterval, // Wait no more than N ms after first batched operation
    credentials: 'include', // Allow to send cookies on different domain
  });
};
