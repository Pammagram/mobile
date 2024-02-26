import { DocumentNode, gql } from '@apollo/client';

import {
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
  RemoveChatOutput,
} from '$shared';

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
