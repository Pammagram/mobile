import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';

import { HeadlessStack } from '$core/components';
import { useMe } from '$modules';

export const AuthLayout: FC = () => {
  const {
    getMe: { data },
  } = useMe({
    fetchPolicy: 'network-only',
  });

  if (data) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <StatusBar style="light" />
      <HeadlessStack />
    </>
  );
};
