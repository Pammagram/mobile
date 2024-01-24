import { ApolloProvider } from '@apollo/client';
import {
  CombineProviders,
  combineProviders as combineProvidersManager,
} from 'react-combine-providers';
import { TamaguiProvider } from 'tamagui';

import { apolloClient } from '$core/apollo';
import tamaguiConfig from '$core/theme/config';

export const combineProviders = (): CombineProviders => {
  const manager = combineProvidersManager();

  manager.push(ApolloProvider, { children: null, client: apolloClient });

  manager.push(TamaguiProvider, {
    config: tamaguiConfig,
    defaultTheme: 'dark',
  });

  return manager;
};
