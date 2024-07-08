import { useCallback } from 'react';

import { getMessagingToken } from '../utils/getMessagingToken';
import { requestPermissionForNotification } from '../utils/requestPermissionForNotification';

import { useSetMessagingToken } from '$modules/session/graphql/mutations/setMessagingToken';

export const useRequestNotificationPermission = () => {
  const { setMessagingToken } = useSetMessagingToken({
    fetchPolicy: 'network-only',
  });

  const requestNotificationPermission = useCallback(async () => {
    await requestPermissionForNotification();

    const token = await getMessagingToken();

    if (!token) {
      return;
    }

    const response = await setMessagingToken.request({
      input: { messagingToken: token },
    });

    if (!response?.data) {
      console.error('Error when updating messaging token');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- every request triggers setMessaging token to update
  }, []);

  return { requestNotificationPermission };
};
