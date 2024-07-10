// eslint-disable-next-line import/no-extraneous-dependencies, simple-import-sort/imports -- imports order matters
import '@expo/metro-runtime';

import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
import { setupMessageListeners } from '$modules/notification/utils/setupMessageListeners';

setupMessageListeners();
// This file should only import and register the root. No components or exports
// should be added here.
renderRootComponent(App);
