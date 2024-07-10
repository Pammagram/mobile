import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import { useChatMessages } from '$modules/chats/graphql/documents';
import { useMe } from '$modules/user';

export const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const { getChatMessages } = useChatMessages({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      input: {
        chatId: Number(chatId),
      },
    },
  });

  const {
    getMe: { data: user },
  } = useMe({
    fetchPolicy: 'cache-only',
  });

  const { loading: areMessagesLoading } = getChatMessages;

  const messages = useMemo(
    () =>
      [...(getChatMessages.data?.data || [])].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1,
      ),
    [getChatMessages.data?.data],
  );

  return { messages, user, areMessagesLoading };
};
