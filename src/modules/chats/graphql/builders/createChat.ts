import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { CreateChatOutput } from '$core/graphql';

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
