import { DocumentNode, gql } from '@apollo/client';

import {
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
  UsersOutput,
} from '$shared';

export const createUsers = createGraphqlBuilder<UsersOutput, DocumentNode>(
  (selection) => gql`
    query Users {
      ${DEFAULT_RESPONSE_NAME}: users {
        ${selection}
      }
    }
  `,
);
