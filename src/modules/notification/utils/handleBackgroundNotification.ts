import notifee, { AndroidImportance } from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { parseNotification } from './parseNotificationData';

// TODO add updating cache to include incoming messages
export async function handleBackgroundNotification(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  try {
    await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    if (!remoteMessage.data) {
      return;
    }

    if (!remoteMessage.data.notifee) {
      return;
    }

    const notifeeNotification = parseNotification(remoteMessage);

    const groupId = `${notifeeNotification?.data.chatId}`;

    await notifee.displayNotification({
      id: groupId,
      title: 'Messages',
      subtitle: 'New messages',
      android: {
        channelId: 'default',
        groupSummary: true,
        groupId,
      },
    });

    await notifee.displayNotification({
      ...notifeeNotification,
      android: {
        ...notifeeNotification?.android,
        groupId,
      },
    });
  } catch (error) {
    console.error('error when handling push notifications', error);
  }
}
