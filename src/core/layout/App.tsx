import { Tabs } from 'expo-router';
import { FC, useEffect } from 'react';

import { ChatDto } from '$core/graphql';
import { useRequestNotificationPermission } from '$core/notifications/hooks/useRequestNotificationPermission';
import { tabs } from '$core/routes/tabs';
import {
  CHAT_CREATED_SUBSCRIPTION,
  useChatMessageAdded,
  useChatRemoved,
  useCurrentUser,
  useMyChats,
} from '$modules';

export const AppLayout: FC = () => {
  // TODO unsubscribe on logout
  useChatMessageAdded({});
  useChatRemoved({});

  const { getMyChats } = useMyChats({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      input: {},
    },
  });

  const { user, isLoading } = useCurrentUser();
  const { requestNotificationPermission } = useRequestNotificationPermission();

  useEffect(() => {
    if (isLoading || !user) {
      return;
    }

    void requestNotificationPermission();
  }, [isLoading, user, requestNotificationPermission]);

  useEffect(() => {
    const chatCreatedCleanup = getMyChats.subscribeToMore({
      document: CHAT_CREATED_SUBSCRIPTION,
      updateQuery: (previousResult, options) => {
        const { subscriptionData } = options;

        const newChat = subscriptionData.data.response
          .data as unknown as ChatDto;

        if (
          previousResult.response.data.find((chat) => chat.id === newChat.id)
        ) {
          return {
            response: {
              ...previousResult.response,
              data: [...previousResult.response.data],
            },
          };
        }

        return {
          response: {
            ...previousResult.response,
            data: [...previousResult.response.data, newChat],
          },
        };
      },
    });

    return () => {
      chatCreatedCleanup();
    };
  }, [getMyChats]);

  // useEffect(() => {
  //   Toast.show({
  //     type: 'message',
  //     text1: 'Max Adventure',
  //     text2: 'Hi there!',
  //   });
  // }, []);

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
