import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

import { handleForegroundNotification } from './handleForegroundNotification';

export const setupMessageListeners = () => {
  async function onMessageReceived(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) {
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

    const notifeeNotification = JSON.parse(
      remoteMessage.data.notifee as string,
    ) as Notification;

    await notifee.displayNotification(notifeeNotification);
  }

  // notifee.onBackgroundEvent(async (notification) => {
  //   await Promise.resolve();
  // });

  messaging().onMessage(handleForegroundNotification);
  messaging().setBackgroundMessageHandler(onMessageReceived);
};
