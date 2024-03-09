import { DocumentNode, gql } from '@apollo/client';

import {
  ChatCreatedOutput,
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
} from '$shared';

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
