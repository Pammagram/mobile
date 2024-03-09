import { DocumentNode, gql } from '@apollo/client';

import {
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
  MessagesOutput,
} from '$shared';

export const createChatMessages = createGraphqlBuilder<
  MessagesOutput,
  DocumentNode
>(
  (selection) => gql`
    query GetChatMessages ($input: MessagesInput!) {
      ${DEFAULT_RESPONSE_NAME}: messages(input: $input) {
        ${selection}
      }
    }
  `,
);
