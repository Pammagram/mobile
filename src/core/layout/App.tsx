import { useApolloClient } from '@apollo/client';
import {
  MessageCircle,
  MessageSquarePlus,
  Settings,
  UserCircle2,
} from '@tamagui/lucide-icons';
import { router, Tabs } from 'expo-router';
import { FC, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { tabBarIcon } from '$core/utils';
import {
  CHAT_CREATED_SUBSCRIPTION,
  useChatMessageAdded,
  useChatRemoved,
  useMyChats,
} from '$features';
import { ChatDto } from '$shared';

const CreateChatButton: FC = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push('/(app)/chats/create')}
      style={{ padding: 10 }}
    >
      <MessageSquarePlus color="black" />
    </TouchableOpacity>
  );
};

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
  const client = useApolloClient();

  return (
    <Tabs
      screenOptions={{
        unmountOnBlur: true,
      }}
    >
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
          // headerShown: false,
          tabBarIcon: tabBarIcon(MessageCircle),
          headerRight: CreateChatButton.bind(null, {
            apolloClient: client,
          }),
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
