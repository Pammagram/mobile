import { ApolloProvider } from '@apollo/client';
import {
  CombineProviders,
  combineProviders as combineProvidersManager,
} from 'react-combine-providers';

import { apolloClient } from '$core/apollo';

export const combineProviders = (): CombineProviders => {
  const manager = combineProvidersManager();

  manager.push(ApolloProvider, { children: null, client: apolloClient });

  return manager;
};
