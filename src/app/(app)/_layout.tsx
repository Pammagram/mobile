import { Redirect, Tabs } from 'expo-router';
import { FC } from 'react';

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
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          unmountOnBlur: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
