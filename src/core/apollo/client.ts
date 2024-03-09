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

  // * enable storing only in production to speed up development
  if (process.env.NODE_ENV === 'production') {
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      maxSize: false,
    });
  }

  const apolloClient = new ApolloClient({
    link: createLink(),
    cache,
    connectToDevTools: true,
    credentials: 'include',
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });

  return apolloClient;
};
