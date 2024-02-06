import { DocumentNode, gql } from '@apollo/client';

import {
  ChatOutput,
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
} from '$shared';

export const createChat = createGraphqlBuilder<ChatOutput, DocumentNode>(
  (selection) => gql`
    query GetChat ($input: ChatInput!) {
      ${DEFAULT_RESPONSE_NAME}: chat(input: $input) {
        ${selection}
      }
    }
  `,
);
