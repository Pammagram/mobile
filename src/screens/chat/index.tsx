import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useChatMessages } from 'features/fetchChatMessages';
import { SUBSCRIPTION } from 'features/subscribeToChatMessages/graphql/subscription';
import { FC, useEffect } from 'react';
import { ScrollView, Spinner, Text, View, XStack, YStack } from 'tamagui';

import { createChatMessagesSubscription } from '$entities';
import { useChat, useCurrentUser } from '$features';
import { MessageDto, StrictType } from '$shared';

export const ChatScreen: FC = () => {
  const { getChat, getChatMessages } = useLogic();

  const { data: messagesData, loading: areMessagesLoading } = getChatMessages;
  const { user } = useCurrentUser<StrictType.STRICT>();

  return (
    <View>
      <Text marginTop={10}>This is chat {getChat.data?.data.title}</Text>
      <ScrollView>
        <YStack>
          {areMessagesLoading && <Spinner />}
          {!areMessagesLoading &&
            messagesData?.data.map((message) => {
              return (
                <XStack
                  key={message.id}
                  justifyContent={
                    message.sender.id === user.id ? 'flex-end' : 'flex-start'
                  }
                >
                  <Text>{message.text}</Text>
                </XStack>
              );
            })}
        </YStack>
      </ScrollView>
    </View>
  );
};

const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const navigation = useNavigation();
  const router = useRouter();

  const { getChatMessages } = useChatMessages({
    onCompleted: (_data) => {
      getChatMessages.subscribeToMore({
        document: SUBSCRIPTION,
        updateQuery: (previousResult, options) => {
          const newMessage = options.subscriptionData.data.response
            .data as unknown as MessageDto;

          console.log('newMessage', newMessage);

          if (newMessage.chat.id !== Number(chatId)) {
            return previousResult;
          }

          console.log('merging result');

          return {
            response: {
              data: [...previousResult.response.data, newMessage],
            },
          };
        },
      });
    },
  });

  const { getChat } = useChat({
    variables: {
      input: {
        id: Number(chatId),
      },
    },
    onCompleted: (data) => {
      const fetchedChatId = data.response.data.id;

      if (!fetchedChatId) {
        return;
      }

      void getChatMessages.request({
        input: {
          chatId: fetchedChatId,
        },
      });
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: getChat.data?.data.title,
    });
  }, [navigation]);

  useEffect(() => {
    if (!getChat.loading && !getChat.data?.data) {
      console.error('Not found chat');
      router.push('/(app)/chats');
    }
  }, [getChat]);

  return {
    getChat,
    getChatMessages,
  };
};
