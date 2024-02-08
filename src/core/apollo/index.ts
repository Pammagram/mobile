import { ApolloClient, InMemoryCache, TypePolicies } from '@apollo/client';

import { customTypePolicies } from './config';
import { createLink } from './link';

import { mergeObjects } from '$shared';

export const apolloClient = new ApolloClient({
  link: createLink(),
  cache: new InMemoryCache({
    typePolicies: mergeObjects<TypePolicies>(customTypePolicies.flat()),
  }),
  connectToDevTools: true,
  defaultOptions: {
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
