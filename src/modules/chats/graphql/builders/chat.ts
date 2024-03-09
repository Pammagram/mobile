import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo';
import { ChatOutput } from '$core/graphql';

export const createChat = createGraphqlBuilder<ChatOutput, DocumentNode>(
  (selection) => gql`
    query GetChat ($input: ChatInput!) {
      ${DEFAULT_RESPONSE_NAME}: chat(input: $input) {
        ${selection}
      }
    }
  `,
);
