import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { ChatCreatedOutput } from '$core/graphql';

export const createChatCreated = createGraphqlBuilder<
  ChatCreatedOutput,
  DocumentNode
>(
  (selection) => gql`
  subscription ChatCreated  {
    ${DEFAULT_RESPONSE_NAME}: chatCreated {
      ${selection}
    }
  }
`,
);
