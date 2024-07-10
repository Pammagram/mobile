import { useLocalSearchParams } from 'expo-router';
import { useCallback, useRef } from 'react';
import { FlatList } from 'react-native';

import { SendMessageParams } from './types';

import { useSendMessage } from '$modules/chat/hooks';

export const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const flatListRef = useRef<FlatList>(null);

  const { sendMessage } = useSendMessage();

  const sendMessageHandler = useCallback(
    async (params: SendMessageParams) => {
      const { text } = params;

      await sendMessage({
        chatId: Number(chatId),
        text,
      });

      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    },
    [chatId, sendMessage],
  );

  return {
    sendMessage: sendMessageHandler,
    flatListRef,
  };
};
