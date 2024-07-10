import notifee, {
  Event as NotifeeEvent,
  EventType,
} from '@notifee/react-native';

import { Event } from '../types/Event';

import { sendMessageFromNotification } from '$modules/chat/utils/sendMessageFromNotification';

export const handleNotificationEvent = async (
  event: NotifeeEvent,
): Promise<void> => {
  const { type, detail } = event as Event;

  const pressActionId = detail.pressAction?.id;

  if (type === EventType.ACTION_PRESS && pressActionId === 'reply') {
    const text = detail.input!;

    const {
      data: { chatId },
      id,
    } = detail.notification!;

    console.debug('sending message...');
    await sendMessageFromNotification({ chatId, text });
    await notifee.cancelNotification(id!);
    await notifee.cancelDisplayedNotification(id!);
    console.debug('message sent!');
  }
};
