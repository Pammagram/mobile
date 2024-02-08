import { useApolloClientDevTools } from '@dev-plugins/apollo-client/build/useApolloClientDevTools';
import { SplashScreen, Stack } from 'expo-router';
import { FC, useEffect } from 'react';

import { apolloClient } from '$core/apollo';
import { usePreloadedAssets } from '$core/assets';
import { combineProviders } from '$core/providers';

void SplashScreen.preventAutoHideAsync();

const manager = combineProviders();
const MasterProvider = manager.master();

const PreProviderApp: FC = () => {
  useApolloClientDevTools(apolloClient);

  const { areAssetsLoaded } = usePreloadedAssets();

  useEffect(() => {
    if (areAssetsLoaded) {
      void SplashScreen.hideAsync();
    }
  }, [areAssetsLoaded]);

  if (!areAssetsLoaded) {
    return null;
  }

  return (
    <MasterProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </MasterProvider>
  );
};

export default PreProviderApp;
