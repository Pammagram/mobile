import { DocumentNode, gql } from '@apollo/client';

import {
  CreateChatOutput,
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
} from '$shared';

export const createCreateChat = createGraphqlBuilder<
  CreateChatOutput,
  DocumentNode
>(
  (selection) => gql`
    mutation CreateChat ($input: CreateChatInput!) {
      ${DEFAULT_RESPONSE_NAME}: createChat(input: $input) {
        ${selection}
      }
    }
  `,
);
