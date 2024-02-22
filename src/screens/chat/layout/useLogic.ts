import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { create } from 'zustand';

import { useChat } from '$features';

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
      console.error('Not found chat');
      router.push('/(app)/contacts');
    }
  }, [getChat.data]);

  return {
    getChat,
  };
};

type ChatHeaderParams = {
  inputHeight: number;
  messagesContainerHeight: number;

  setInputHeight: (height: number) => void;
  setMessagesContainerHeight: (height: number) => void;
};

export const useChatLayout = create<ChatHeaderParams>((set) => ({
  inputHeight: 0,
  setInputHeight: (inputHeight: number) => set({ inputHeight }),

  messagesContainerHeight: 0,
  setMessagesContainerHeight: (messagesContainerHeight: number) =>
    set({ messagesContainerHeight }),
}));
