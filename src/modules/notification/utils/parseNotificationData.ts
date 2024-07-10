import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { Notification } from '../types/Notification';

export const parseNotification = (
  message: FirebaseMessagingTypes.RemoteMessage,
): Notification | undefined => {
  if (!message.data?.notifee) {
    console.error('Error when parsing push notification');

    return;
  }

  return JSON.parse(message.data.notifee as string) as Notification;
};
