import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import { handleBackgroundNotification } from './handleBackgroundNotification';
import { handleNotificationEvent } from './handleNotificationEvent';

export const setupMessageListeners = () => {
  notifee.onBackgroundEvent(handleNotificationEvent);
  messaging().setBackgroundMessageHandler(handleBackgroundNotification);
};
