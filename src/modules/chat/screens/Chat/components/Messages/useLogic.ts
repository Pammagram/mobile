import { useLocalSearchParams } from 'expo-router';

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

  return { messages, user, areMessagesLoading };
};
