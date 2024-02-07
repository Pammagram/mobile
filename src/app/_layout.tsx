import { SplashScreen, Stack } from 'expo-router';
import { FC, useEffect } from 'react';

import { usePreloadedAssets } from '$core/assets';
import { combineProviders } from '$core/providers';

SplashScreen.preventAutoHideAsync();

const manager = combineProviders();
const MasterProvider = manager.master();

const PreProviderApp: FC = () => {
  const { areAssetsLoaded } = usePreloadedAssets();

  useEffect(() => {
    if (areAssetsLoaded) {
      SplashScreen.hideAsync();
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
