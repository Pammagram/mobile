import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useChatMessages } from 'features/fetchChatMessages';
import { FC, useEffect } from 'react';
import { ScrollView, Spinner, Text, View, XStack, YStack } from 'tamagui';

import { useChat, useCurrentUser } from '$features';
import { StrictType } from '$shared';

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

  const { getChatMessages } = useChatMessages();

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
