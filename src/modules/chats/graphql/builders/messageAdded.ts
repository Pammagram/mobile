import { DocumentNode, gql } from '@apollo/client';

import {
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
  MessageAddedOutput,
} from '$shared';

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
