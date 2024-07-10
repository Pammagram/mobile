import notifee from '@notifee/react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { RouteBuilder } from '$core/routes/routeBuilder';
import { Notification } from '$modules/notification/types/Notification';

export const useInitialNotification = () => {
  const router = useRouter();

  useEffect(() => {
    void (async () => {
      const initialNotification = await notifee.getInitialNotification();

      if (!initialNotification) {
        return;
      }

      const {
        data: { chatId },
      } = initialNotification.notification as Notification;

      if (!chatId) {
        return;
      }

      router.push(RouteBuilder.chat(chatId));
    })();
  }, [router]);
};
