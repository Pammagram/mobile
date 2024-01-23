import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

type ReturnType = {
  isAssetsLoaded: boolean;
};

export const usePreloadedAssets = (): ReturnType => {
  const [isFontsLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const assetsLoadStatus = [isFontsLoaded];

  const isAssetsLoaded = assetsLoadStatus.every(
    (isAssetLoaded) => isAssetLoaded,
  );

  useEffect(() => {
    if (isAssetsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isAssetsLoaded]);

  return {
    isAssetsLoaded,
  };
};
