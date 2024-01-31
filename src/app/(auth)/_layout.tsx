import { useReactiveVar } from '@apollo/client';
import { Redirect } from 'expo-router';
import { FC } from 'react';

import { userVar } from '$entities';
import { HeadlessStack } from '$shared';

const AuthLayout: FC = () => {
  const user = useReactiveVar(userVar);

  if (!user) {
    return <Redirect href="/" />;
  }

  return <HeadlessStack />;
};

export default AuthLayout;
