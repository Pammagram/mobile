import messaging from '@react-native-firebase/messaging';

export const getMessagingToken = async (): Promise<string | undefined> => {
  const token = await messaging().getToken();

  return token;
};
