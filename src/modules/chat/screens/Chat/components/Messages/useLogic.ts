import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import { useChatMessages } from '$modules/chat/hooks';
import { useMe } from '$modules/user';

export const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const {
    getMe: { data: user },
  } = useMe({
    fetchPolicy: 'cache-only',
  });

  const { areMessagesLoading, messages } = useChatMessages({
    chatId: Number(chatId),
  });

  const messagesSorted = useMemo(() => {
    if (areMessagesLoading) {
      return [];
    }

    return [...messages].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [areMessagesLoading, messages]);

  return { messages: messagesSorted, user, areMessagesLoading };
};
