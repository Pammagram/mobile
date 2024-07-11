import { Tabs } from 'expo-router';
import { FC, useEffect } from 'react';

import { tabs } from '$core/routes/tabs';
import { useCurrentUser } from '$modules';
import { useChatMessageAdded, useChatRemoved } from '$modules/chats/graphql';
import { useWatchChatAdded } from '$modules/chats/hooks/useWatchChatAdded';
import { useInitialNotification } from '$modules/notification/hooks/useInitialNotification';
import { useRequestNotificationPermission } from '$modules/notification/hooks/useRequestNotificationPermission';

export const AppLayout: FC = () => {
  // TODO unsubscribe on logout
  useChatMessageAdded({});
  useChatRemoved({});
  useInitialNotification();
  useWatchChatAdded();
  const { user, isLoading } = useCurrentUser();
  const { requestNotificationPermission } = useRequestNotificationPermission();

  useEffect(() => {
    if (isLoading || !user) {
      return;
    }

    void requestNotificationPermission();
  }, [isLoading, user, requestNotificationPermission]);

  return (
    <Tabs
      screenOptions={{
        unmountOnBlur: false,
      }}
    >
      {tabs.map((tab) => {
        return <Tabs.Screen key={tab.name} {...tab} />;
      })}
    </Tabs>
  );
};
