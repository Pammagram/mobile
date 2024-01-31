import { Redirect, Slot } from 'expo-router';
import { FC } from 'react';

import { useCurrentUser } from '$features';

const MainLayout: FC = () => {
  const { user } = useCurrentUser('cache-only');

  if (!user) {
    return <Redirect href="/" />;
  }

  return <Slot />;
};

export default MainLayout;
