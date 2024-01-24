import { Slot, SplashScreen } from 'expo-router';
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
      <Slot />
    </MasterProvider>
  );
};

export default PreProviderApp;
