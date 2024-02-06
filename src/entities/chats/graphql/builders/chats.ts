import { DocumentNode, gql } from '@apollo/client';

import {
  ChatsOutput,
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
} from '$shared';

export const createChats = createGraphqlBuilder<ChatsOutput, DocumentNode>(
  (selection) => gql`
    query GetChats ($input: ChatsInput!) {
      ${DEFAULT_RESPONSE_NAME}: chats(input: $input) {
        ${selection}
      }
    }
  `,
);
