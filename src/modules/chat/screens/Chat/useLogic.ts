import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';

import { useAddMessage } from '$modules/chats';

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
    sendMessage,
  };
};
