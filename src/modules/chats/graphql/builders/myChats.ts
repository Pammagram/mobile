import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { ChatsOutput } from '$core/graphql';

export const createMyChats = createGraphqlBuilder<ChatsOutput, DocumentNode>(
  (selection) => gql`
    query GetChats ($input: ChatsInput!) {
      ${DEFAULT_RESPONSE_NAME}: myChats(input: $input) {
        ${selection}
      }
    }
  `,
);
