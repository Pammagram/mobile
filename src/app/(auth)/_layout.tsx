import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';

import { useCurrentUser } from '$features';
import { HeadlessStack } from '$shared';

const AuthLayout: FC = () => {
  const { user } = useCurrentUser('cache-only');

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <StatusBar style="light" />
      <HeadlessStack />
    </>
  );
};

export default AuthLayout;
