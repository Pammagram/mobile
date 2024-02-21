import { useFonts } from 'expo-font';

type ReturnType = {
  areAssetsLoaded: boolean;
};

export const usePreloadedAssets = (): ReturnType => {
  const [areFontsLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const areAssetsLoaded = [areFontsLoaded].every(Boolean);

  return {
    areAssetsLoaded,
  };
};
