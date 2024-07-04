import { Tabs } from 'expo-router';
import { FC, useEffect } from 'react';

import { ChatDto } from '$core/graphql';
import { tabs } from '$core/routes/tabs';
import {
  CHAT_CREATED_SUBSCRIPTION,
  useChatMessageAdded,
  useChatRemoved,
  useCurrentUser,
  useMyChats,
} from '$modules';
import { getMessagingToken } from '$modules/notifications/utils/getMessagingToken';
import { useSetMessagingToken } from '$modules/session/graphql/mutations/setMessagingToken';

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
  const { setMessagingToken } = useSetMessagingToken();

  useEffect(() => {
    if (isLoading || !user) {
      return;
    }

    void (async () => {
      const token = await getMessagingToken();

      if (!token) {
        return;
      }

      try {
        await setMessagingToken.request({
          input: {
            messagingToken: token,
          },
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isLoading, user]);

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
  }, []);

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
