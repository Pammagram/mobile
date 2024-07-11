import { gql } from '@apollo/client';
import { InferSelection } from 'gql-ts-builder';

import { createChatMessages } from '../../builders';

import { Simplify } from '$core/utils';
import { MessageStatus } from '$modules/chat/types';

export const CHAT_MESSAGES_PREFIX = 'chatMessages';

export const MESSAGES_OUTPUT_TYPE_NAME = 'MessagesOutput';

export const _CHAT_MESSAGES_QUERY = createChatMessages({
  chatId: true,
  data: {
    id: true,
    sender: {
      id: true,
      username: true,
    },
    chat: {
      id: true,
    },
    createdAt: true,
    updatedAt: true,
    text: true,
  },
});

export const CHAT_MESSAGES_QUERY = gql`
  query ChatMessages($input: MessagesInput!) {
    response: messages(input: $input) {
      chatId
      data {
        id
        sender {
          id
          username
        }
        chat {
          id
        }
        createdAt
        updatedAt
        text
        status @client # client variable
      }
    }
  }
`;

export type ChatMessagesData = Simplify<
  InferSelection<typeof _CHAT_MESSAGES_QUERY>
>;

export type ChatMessage = Simplify<
  ChatMessagesData['data'][0] & { status: MessageStatus }
>;
