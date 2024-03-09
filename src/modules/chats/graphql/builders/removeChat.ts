import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo';
import { RemoveChatOutput } from '$core/graphql';

export const createRemoveChat = createGraphqlBuilder<
  RemoveChatOutput,
  DocumentNode
>(
  (selection) => gql`
  mutation RemoveChat($input: RemoveChatInput!) {
    ${DEFAULT_RESPONSE_NAME}: removeChat(input: $input) {
      ${selection}
    }
  }
`,
);
