import { Redirect } from 'expo-router';
import { FC } from 'react';

import { useCurrentUser } from '$features';

export const RootScreen: FC = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (user?.username) {
    return <Redirect href="/main" />;
  }

  return <Redirect href="/sign-in" />;
};
