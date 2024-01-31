import { useReactiveVar } from '@apollo/client';
import { Redirect, Slot } from 'expo-router';
import { FC } from 'react';

import { userVar } from '$entities';

const MainLayout: FC = () => {
  const user = useReactiveVar(userVar);

  if (!user) {
    return <Redirect href="/" />;
  }

  return <Slot />;
};

export default MainLayout;
