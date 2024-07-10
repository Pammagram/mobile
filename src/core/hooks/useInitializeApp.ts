import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { usePreloadedAssets } from './usePreloadedAssets';

import { useInitializeApolloClient } from '$core/apollo/hooks/useInitializeApolloClient';

export type UseInitializeAppReturnType =
  | {
      client: undefined;
      isAppReady: false;
    }
  | {
      client: ApolloClient<NormalizedCacheObject>;
      isAppReady: true;
    };

export const useInitializeApp = (): UseInitializeAppReturnType => {
  const { areAssetsLoaded } = usePreloadedAssets();
  const { client } = useInitializeApolloClient();

  const isAppReady = [areAssetsLoaded, client].every((item) => Boolean(item));

  return {
    client,
    isAppReady,
  } as UseInitializeAppReturnType;
};
