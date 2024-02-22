import {
  MessageCircle,
  Pencil,
  Settings,
  UserCircle2,
} from '@tamagui/lucide-icons';
import { Redirect, Tabs } from 'expo-router';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { tabBarIcon } from '$core/utils';
import {
  toggleActionSheet,
  useChatMessageAdded,
  useCurrentUser,
} from '$features';

const CreateChatButton: FC = () => {
  return (
    <TouchableOpacity onPress={toggleActionSheet} style={{ padding: 10 }}>
      <Pencil color="black" />
    </TouchableOpacity>
  );
};

const MainLayout: FC = () => {
  const { user } = useCurrentUser();

  // TODO unsubscribe on logout
  useChatMessageAdded({});

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
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
          headerRight: CreateChatButton,
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
