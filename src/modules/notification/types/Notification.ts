import { Notification as RnNotification } from '@notifee/react-native';

import { ChatMessagePayload } from './ChatMessagePayload';

export type Notification = RnNotification & { data: ChatMessagePayload };
