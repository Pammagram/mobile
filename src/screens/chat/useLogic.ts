import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useChatMessages } from 'features/chats/logic/fetchChatMessages';
import { useAddMessage } from 'features/chats/logic/sendMessage';
import { useCallback, useEffect, useMemo } from 'react';
import { IMessage } from 'react-native-gifted-chat';

import { useChat } from '$features';
import { MessageDto } from '$shared';

type SendMessageParams = {
  text: string;
};

export const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const navigation = useNavigation();
  const router = useRouter();

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
    async (params: SendMessageParams) => {
      const { text } = params;

      const response = await addMessage.request({
        input: {
          chatId: Number(chatId),
          text,
        },
      });

      console.log('response', response);
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
  };
};

export const transformMessage: (message: MessageDto) => IMessage = (
  message,
) => ({
  _id: message.id,
  createdAt: new Date(),
  text: message.text,
  user: {
    _id: message.sender.id,
    name: message.sender.username || '',
  },
  sent: true,
});
