import { DocumentNode, gql } from '@apollo/client';

import {
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
  LogoutOutput,
} from '$shared';

export const createLogout = createGraphqlBuilder<LogoutOutput, DocumentNode>(
  (selection) => gql`
    mutation Logout {
      ${DEFAULT_RESPONSE_NAME}: logout {
        ${selection}
      }
    }
  `,
);
