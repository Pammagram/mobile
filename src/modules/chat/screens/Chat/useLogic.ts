import { useApolloClient } from '@apollo/client';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useRef } from 'react';
import { FlatList } from 'react-native';

import { SendMessageParams } from './types';

import { GraphQlInput, GraphQlResponse } from '$core/apollo';
import { MessagesInput, StrictType } from '$core/graphql';
import { useSendMessage } from '$modules/chat/hooks';
import { MessageStatus } from '$modules/chat/types';
import {
  CHAT_MESSAGES_QUERY,
  ChatMessage,
  ChatMessagesData,
} from '$modules/chats/graphql';
import { useCurrentUser } from '$modules/user';

export const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const { user } = useCurrentUser<StrictType.STRICT>();
  const { sendMessage } = useSendMessage();
  const { cache } = useApolloClient();

  const sendMessageHandler = useCallback(
    async (params: SendMessageParams) => {
      const { text } = params;

      const sentMessage: ChatMessage = {
        id: Date.now().toString(),
        chat: {
          id: Number(chatId),
        },
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        sender: {
          id: user.id,
          username: user.username,
        },
        status: MessageStatus.Pending,
        text,
      };

      try {
        // TODO change createdAt to number
        cache.updateQuery<
          GraphQlResponse<ChatMessagesData>,
          GraphQlInput<MessagesInput>
        >(
          {
            query: CHAT_MESSAGES_QUERY,
            variables: {
              input: {
                chatId: Number(chatId),
              },
            } satisfies GraphQlInput<MessagesInput>,
          },
          (data) => {
            return {
              response: {
                chatId: Number(chatId),
                data: [sentMessage, ...(data?.response.data ?? [])],
              },
            };
          },
        );
      } catch (error) {
        console.error(error);
      }

      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });

      // TODO we can replace just with the response not with the sent message
      await sendMessage({
        chatId: Number(chatId),
        text,
      });
    },
    [cache, chatId, sendMessage, user.id, user.username],
  );

  return {
    sendMessage: sendMessageHandler,
    flatListRef,
  };
};
