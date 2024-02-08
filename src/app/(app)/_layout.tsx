import { useApolloClientDevTools } from '@dev-plugins/apollo-client';
import { Redirect, Tabs } from 'expo-router';
import { FC } from 'react';

import { apolloClient } from '$core/apollo';
import { useChatMessageAdded, useCurrentUser } from '$features';

const MainLayout: FC = () => {
  const { user } = useCurrentUser('cache-only');

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
