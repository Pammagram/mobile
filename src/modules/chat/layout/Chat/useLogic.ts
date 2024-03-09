import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { useChat } from '$modules/chats';

export const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const { getChat } = useChat({
    variables: {
      input: {
        id: Number(chatId),
      },
    },
  });

  useEffect(() => {
    if (!getChat.loading && !getChat.data?.data) {
      router.push('/(app)/chats');
    }
  }, [getChat.data]);

  return {
    getChat,
  };
};
