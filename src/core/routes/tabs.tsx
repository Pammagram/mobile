import { MessageCircle, Settings, UserCircle2 } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';

import { CreateChatButton } from '$core/components/CreateChatButton';
import { tabBarIcon } from '$core/utils';

export const tabs: Parameters<typeof Tabs.Screen>[0][] = [
  {
    name: 'contacts',
    options: {
      title: 'Contacts',
      tabBarIcon: tabBarIcon(UserCircle2),
    },
  },
  {
    name: 'chats',
    options: {
      title: 'Chats',
      tabBarIcon: tabBarIcon(MessageCircle),
      headerRight: CreateChatButton,
    },
  },
  {
    name: 'settings',
    options: {
      title: 'Settings',
      tabBarIcon: tabBarIcon(Settings),
    },
  },
];
