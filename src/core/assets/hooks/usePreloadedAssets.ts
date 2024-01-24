import { useFonts } from 'expo-font';

type ReturnType = {
  areAssetsLoaded: boolean;
};

export const usePreloadedAssets = (): ReturnType => {
  const [isFontsLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const assetsLoadStatus = [isFontsLoaded];

  const areAssetsLoaded = assetsLoadStatus.every(
    (isAssetLoaded) => isAssetLoaded,
  );

  return {
    areAssetsLoaded,
  };
};
