import { Slot, SplashScreen } from 'expo-router';
import { FC } from 'react';

import { usePreloadedAssets } from '$core/assets';
import { combineProviders } from '$core/providers';

SplashScreen.preventAutoHideAsync();

const manager = combineProviders();
const MasterProvider = manager.master();

const PreProviderApp: FC = () => {
  const { isAssetsLoaded } = usePreloadedAssets();

  if (!isAssetsLoaded) {
    return null;
  }

  return (
    <MasterProvider>
      <Slot />
    </MasterProvider>
  );
};

export default PreProviderApp;
