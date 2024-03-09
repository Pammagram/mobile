import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo';
import { MessageAddedOutput } from '$core/graphql';

export const createChatMessagesSubscription = createGraphqlBuilder<
  MessageAddedOutput,
  DocumentNode
>(
  (selection) => gql`
  subscription MessageAdded  {
    ${DEFAULT_RESPONSE_NAME}: messageAdded {
      ${selection}
    }
  }
`,
);
