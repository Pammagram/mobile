import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo';
import { AddMessageOutput } from '$core/graphql';

export const createAddMessage = createGraphqlBuilder<
  AddMessageOutput,
  DocumentNode
>(
  (selection) => gql`
    mutation AddMessage ($input: AddMessageInput!) {
      ${DEFAULT_RESPONSE_NAME}: addMessage(input: $input) {
        ${selection}
      }
    }
  `,
);
