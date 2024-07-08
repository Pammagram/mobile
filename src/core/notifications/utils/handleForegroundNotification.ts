import { Notification } from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { showNotification } from './notifications';

export const handleForegroundNotification = (
  params: FirebaseMessagingTypes.RemoteMessage,
) => {
  const { data } = params;

  const { title, body } = JSON.parse(data!.notifee as string) as Notification;

  showNotification({
    type: 'message',
    text1: title,
    text2: body,
  });
};
