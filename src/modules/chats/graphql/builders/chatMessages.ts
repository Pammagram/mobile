import { gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';
import { DocumentNode } from 'graphql';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { MessagesOutput } from '$core/graphql';

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
