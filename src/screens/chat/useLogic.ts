import { useLocalSearchParams } from 'expo-router';
import { useAddMessage } from 'features/chats/graphql/sendMessage';
import { useCallback } from 'react';

type SendMessageParams = {
  text: string;
};

export const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const { addMessage } = useAddMessage();

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

  return {
    // getChat,
    sendMessage,
  };
};
