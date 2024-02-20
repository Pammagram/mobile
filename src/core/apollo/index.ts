import { ApolloClient, InMemoryCache, TypePolicies } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';

import { customTypePolicies } from './config';
import { createLink } from './link';

import { mergeObjects } from '$shared';

export const initializeApolloClient = async () => {
  const cache = new InMemoryCache({
    typePolicies: mergeObjects<TypePolicies>(customTypePolicies.flat()),
  });

  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
    maxSize: false,
  });

  const apolloClient = new ApolloClient({
    link: createLink(),
    cache,
    connectToDevTools: true,
    credentials: 'include',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      },
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
  return apolloClient;
};
