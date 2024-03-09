import { DocumentNode, gql } from '@apollo/client';

import {
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
  UpdateUserOutput,
} from '$shared';

export const createUpdateMe = createGraphqlBuilder<
  UpdateUserOutput,
  DocumentNode
>(
  (selection) => gql`
    mutation UpdateMe($input: UpdateUserInput!) {
      ${DEFAULT_RESPONSE_NAME}: updateMe(input: $input) {
        ${selection}
      }
    }
  `,
);
