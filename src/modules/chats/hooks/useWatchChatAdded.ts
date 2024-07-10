import { useEffect } from 'react';

import { CHAT_CREATED_SUBSCRIPTION, useMyChats } from '../graphql';

import { ChatDto } from '$core/graphql';

export const useWatchChatAdded = () => {
  const { getMyChats } = useMyChats({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      input: {},
    },
  });

  useEffect(() => {
    const chatCreatedCleanup = getMyChats.subscribeToMore({
      document: CHAT_CREATED_SUBSCRIPTION,
      updateQuery: (previousResult, options) => {
        const { subscriptionData } = options;

        const newChat = subscriptionData.data.response
          .data as unknown as ChatDto;

        if (
          previousResult.response.data.find((chat) => chat.id === newChat.id)
        ) {
          return {
            response: {
              ...previousResult.response,
              data: [...previousResult.response.data],
            },
          };
        }

        return {
          response: {
            ...previousResult.response,
            data: [...previousResult.response.data, newChat],
          },
        };
      },
    });

    return () => {
      chatCreatedCleanup();
    };
  }, [getMyChats]);
};
