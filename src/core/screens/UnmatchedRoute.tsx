import { Redirect } from 'expo-router';
import { FC } from 'react';

import { logPrettied } from '$core/utils/debug';

export const UnmatchedRouteScreen: FC = (props) => {
  console.error('Oops! Such route does not exists! Redirecting to main page');
  console.error('Props being passed to non-existing route ');
  logPrettied(props);

  return <Redirect href="/" />;
};
