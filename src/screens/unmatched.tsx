import { Redirect } from 'expo-router';
import { FC } from 'react';

import { formatStringify } from '$shared';

export const UnmatchedRouteScreen: FC = (props) => {
  console.error('Oops! Such route does not exists! Redirecting to main page');
  console.error(
    'Props being passed to non-existing route ',
    formatStringify(props),
  );

  return <Redirect href="/" />;
};
