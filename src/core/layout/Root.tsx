import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useApolloClientDevTools } from '@dev-plugins/apollo-client/build/useApolloClientDevTools';
import messaging from '@react-native-firebase/messaging';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { FC, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Spinner, TamaguiProvider } from 'tamagui';

import { ToastContainer } from '$core/components/organisms/Toast/ToastContainer';
import { useInitializeApp } from '$core/hooks/useInitializeApp';
import { combineProviders } from '$core/providers';
import tamaguiConfig from '$core/theme/config';
import { useForegroundNotification } from '$modules/notification/hooks/useForegroundNotification';
import { requestPermissionForNotification } from '$modules/notification/utils/requestPermissionForNotification';

void SplashScreen.preventAutoHideAsync();
const manager = combineProviders();
const MasterProvider = manager.master();

export const RootLayout: FC = () => (
  <MasterProvider>
    <PreProviderApp />
    <ToastContainer />
  </MasterProvider>
);

const PreProviderApp: FC = () => {
  const { client, isAppReady } = useInitializeApp();
  const colorScheme = useColorScheme();

  useEffect(() => {
    void requestPermissionForNotification();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      void SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return <Spinner />;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ApolloProvider client={client}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <ApolloDevTools />
          <ForegroundNotifications />
        </ApolloProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
};

const ForegroundNotifications = () => {
  const { handleForegroundNotification } = useForegroundNotification();

  useEffect(() => {
    const cleanup = messaging().onMessage(handleForegroundNotification);

    return () => {
      cleanup();
    };
  }, [handleForegroundNotification]);

  return null;
};

const ApolloDevTools = () => {
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;

  useApolloClientDevTools(client);

  return null;
};
