import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { SendMessageOutput } from '$core/graphql';

export const createSendMessage = createGraphqlBuilder<
  SendMessageOutput,
  DocumentNode
>(
  (selection) => gql`
    mutation SendMessage ($input: SendMessageInput!) {
      ${DEFAULT_RESPONSE_NAME}: sendMessage(input: $input) {
        ${selection}
      }
    }
  `,
);
