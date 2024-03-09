import { DocumentNode, gql } from '@apollo/client';

import {
  ChatRemovedOutput,
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
} from '$shared';

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
