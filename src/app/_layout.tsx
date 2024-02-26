import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useApolloClientDevTools } from '@dev-plugins/apollo-client/build/useApolloClientDevTools';
import { SplashScreen, Stack } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { SheetProvider } from 'react-native-actions-sheet';
import { Spinner } from 'tamagui';

import { initializeApolloClient } from '$core/apollo';
import { usePreloadedAssets } from '$core/assets';
import { combineProviders } from '$core/providers';

void SplashScreen.preventAutoHideAsync();
const manager = combineProviders();
const MasterProvider = manager.master();

const PostProvider = () => {
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;

  useApolloClientDevTools(client);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

const PreProviderApp: FC = () => {
  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >();

  const { areAssetsLoaded } = usePreloadedAssets();

  // TODO to hook
  useEffect(() => {
    async function init() {
      const apolloClient = await initializeApolloClient();

      setClient(apolloClient);
    }

    init().catch(console.error);
  }, []);

  useEffect(() => {
    if (areAssetsLoaded) {
      void SplashScreen.hideAsync();
    }
  }, [areAssetsLoaded]);

  if (!areAssetsLoaded || !client) {
    return <Spinner />;
  }

  return (
    <SheetProvider>
      <ApolloProvider client={client}>
        <PostProvider />
      </ApolloProvider>
    </SheetProvider>
  );
};

export default () => (
  <MasterProvider>
    <PreProviderApp />
  </MasterProvider>
);
