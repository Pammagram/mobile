import { ConfigContext, ExpoConfig } from 'expo/config';

export default (params: ConfigContext): ExpoConfig => {
  const { config } = params;

  return {
    ...config,
    owner: 'medreres',
    name: 'pammagram',
    slug: 'pammagram',
    description: 'Pammagram messenger',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    splash: {
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.pammagram.mobile',
      supportsTablet: true,
      googleServicesFile: './GoogleService-Info.plist',
      entitlements: {
        'aps-environment': 'production',
      },
    },
    android: {
      package: 'com.pammagram.mobile',
      adaptiveIcon: {
        backgroundColor: '#ffffff',
      },
      googleServicesFile: './google-services.json',
    },
    scheme: 'pammagram-mobile',
    experiments: {
      tsconfigPaths: true,
      typedRoutes: true,
    },
    plugins: [
      'expo-font',
      'expo-router',
      '@react-native-firebase/app',
      [
        'expo-contacts',
        {
          contactsPermission: 'Allow $(PRODUCT_NAME) to access your contacts.',
        },
      ],
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '2d0873c9-591e-41c9-a647-86f907c800ee',
      },
    },
  };
};
