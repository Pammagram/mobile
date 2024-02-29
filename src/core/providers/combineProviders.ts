import {
  CombineProviders,
  combineProviders as combineProvidersManager,
} from 'react-combine-providers';
import { TamaguiProvider } from 'tamagui';

import tamaguiConfig from '$core/theme/config';

export const combineProviders = (): CombineProviders => {
  const manager = combineProvidersManager();

  manager.push(TamaguiProvider, {
    config: tamaguiConfig,
    // defaultTheme: 'dark',
  });

  return manager;
};
