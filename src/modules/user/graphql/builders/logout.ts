import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo';
import { LogoutOutput } from '$core/graphql';

export const createLogout = createGraphqlBuilder<LogoutOutput, DocumentNode>(
  (selection) => gql`
    mutation Logout {
      ${DEFAULT_RESPONSE_NAME}: logout {
        ${selection}
      }
    }
  `,
);
