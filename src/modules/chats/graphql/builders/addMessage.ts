import { DocumentNode, gql } from '@apollo/client';

import {
  AddMessageOutput,
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
} from '$shared';

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
