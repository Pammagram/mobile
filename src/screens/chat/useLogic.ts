import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useChatMessages } from 'features/chats/logic/fetchChatMessages';
import { useAddMessage } from 'features/chats/logic/sendMessage';
import { useCallback, useEffect, useMemo } from 'react';

import { useChat, useCurrentUser } from '$features';

type SendMessageParams = {
  text: string;
};

export const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useCurrentUser();

  const { getChatMessages } = useChatMessages({
    variables: {
      input: {
        chatId: Number(chatId),
      },
    },
  });

  const { addMessage } = useAddMessage();

  const { getChat } = useChat({
    variables: {
      input: {
        id: Number(chatId),
      },
    },
  });

  const sendMessage = useCallback(
    (params: SendMessageParams) => {
      const { text } = params;

      void addMessage.request({
        input: {
          chatId: Number(chatId),
          text,
        },
      });
    },
    [addMessage],
  );

  const messages = useMemo(
    () => [...(getChatMessages.data?.data || [])].reverse(),
    [getChatMessages.data?.data],
  );

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
    sendMessage,
    messages,
    user,
  };
};
