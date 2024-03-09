import { Redirect } from 'expo-router';
import { FC } from 'react';

import { useCurrentUser } from '$modules';

export const RootScreen: FC = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Redirect href="/chats" />;
  }

  return <Redirect href="/sign-in" />;
};

export default RootScreen;
