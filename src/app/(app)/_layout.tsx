import { MessageCircle, Settings, UserCircle2 } from '@tamagui/lucide-icons';
import { Redirect, Tabs } from 'expo-router';
import { FC } from 'react';

import { tabBarIcon } from '$core/utils';
import { useChatMessageAdded, useCurrentUser } from '$features';

const MainLayout: FC = () => {
  const { user } = useCurrentUser('cache-only');

  // TODO unsubscribe on logout
  useChatMessageAdded({});

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: tabBarIcon(UserCircle2),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: tabBarIcon(MessageCircle),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: tabBarIcon(Settings),
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
