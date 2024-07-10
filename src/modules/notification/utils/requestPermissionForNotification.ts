import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
// eslint-disable-next-line react-native/split-platform-components -- cross-platform function
import { PermissionsAndroid, Platform } from 'react-native';

export const requestPermissionForNotification = async () => {
  if (Platform.OS === 'android') {
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (response !== 'granted') {
      console.debug("Couldn't get permission");
    }
  } else {
    const authStatus = await messaging().requestPermission();

    const isEnabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!isEnabled) {
      console.debug("Couldn't get permission");
    }
  }

  await notifee.requestPermission();

  // Create a channel (required for Android)
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
};
