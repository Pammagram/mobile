import { DocumentNode, gql } from '@apollo/client';

import {
  ChatsOutput,
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
} from '$shared';

export const createChat = createGraphqlBuilder<ChatsOutput, DocumentNode>(
  (selection) => gql`
    query GetChat ($input: ChatInput!) {
      ${DEFAULT_RESPONSE_NAME}: chat(input: $input) {
        ${selection}
      }
    }
  `,
);
