import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useGlobalSearchParams } from 'expo-router';
import { useCallback } from 'react';

import { showNotification } from '../utils/notifications';
import { parseNotification } from '../utils/parseNotificationData';

export const useForegroundNotification = () => {
  const { chatId: currentChatId } = useGlobalSearchParams();

  const handleForegroundNotification = useCallback(
    (params: FirebaseMessagingTypes.RemoteMessage) => {
      const payload = parseNotification(params);

      if (!payload) {
        return;
      }

      const { title, body, data } = payload;

      if (Number(data.chatId) === Number(currentChatId)) {
        return;
      }

      showNotification({
        type: 'message',
        text1: title,
        text2: body,
        props: { data },
      });
    },
    [currentChatId],
  );

  return { handleForegroundNotification };
};
