import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';

import { HeadlessStack } from '$core/components';

export const AuthLayout: FC = () => {
  return (
    <>
      <StatusBar style="light" />
      <HeadlessStack />
    </>
  );
};
