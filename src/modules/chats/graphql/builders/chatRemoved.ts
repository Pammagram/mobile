import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo';
import { ChatRemovedOutput } from '$core/graphql';

export const createChatRemoved = createGraphqlBuilder<
  ChatRemovedOutput,
  DocumentNode
>(
  (selection) => gql`
  subscription ChatRemoved  {
    ${DEFAULT_RESPONSE_NAME}: chatRemoved {
      ${selection}
    }
  }
`,
);
