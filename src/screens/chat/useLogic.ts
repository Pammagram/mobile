import { useLocalSearchParams } from 'expo-router';
import { useAddMessage } from 'features/chats/logic/sendMessage';
import { useCallback } from 'react';

type SendMessageParams = {
  text: string;
};

export const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  // const navigation = useNavigation();
  // const router = useRouter();

  const { addMessage } = useAddMessage();

  // const { getChat } = useChat({
  //   variables: {
  //     input: {
  //       id: Number(chatId),
  //     },
  //   },
  // });

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

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: getChat.data?.data.title,
  //   });
  // }, [navigation]);

  // useEffect(() => {
  //   if (!getChat.loading && !getChat.data?.data) {
  //     console.error('Not found chat');
  //     router.push('/(app)/chats');
  //   }
  // }, [getChat]);

  return {
    // getChat,
    sendMessage,
  };
};
