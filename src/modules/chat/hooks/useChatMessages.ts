import {
  ChatMessage,
  useChatMessages as useChatMessagesQuery,
} from '$modules/chats/graphql';

type Params = {
  chatId: number;
};

type ReturnType =
  | {
      areMessagesLoading: true;
      messages: undefined;
    }
  | { areMessagesLoading: false; messages: ChatMessage[] };

export const useChatMessages = (params: Params): ReturnType => {
  const { chatId } = params;

  const {
    getChatMessages: { data, loading: areMessagesLoading },
  } = useChatMessagesQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      input: {
        chatId: Number(chatId),
      },
    },
  });

  return {
    messages: data?.data,
    areMessagesLoading,
  } as ReturnType;
};
