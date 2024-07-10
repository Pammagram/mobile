import { Event as NotifeeEvent } from '@notifee/react-native';

import { Notification } from './Notification';

export type Event = NotifeeEvent & { detail: { notification?: Notification } };
