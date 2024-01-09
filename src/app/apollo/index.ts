import { ApolloClient, InMemoryCache, TypePolicies } from '@apollo/client';

import { createLink } from './link';
import { customTypePolicies } from './typePolicies';

import { mergeObjects } from '$shared';

export const apolloClient = new ApolloClient({
  link: createLink(),
  cache: new InMemoryCache({
    typePolicies: mergeObjects<TypePolicies>(customTypePolicies.flat()),
  }),
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
