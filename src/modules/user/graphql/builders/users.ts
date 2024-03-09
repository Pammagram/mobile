import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { UsersOutput } from '$core/graphql';

export const createUsers = createGraphqlBuilder<UsersOutput, DocumentNode>(
  (selection) => gql`
    query Users {
      ${DEFAULT_RESPONSE_NAME}: users {
        ${selection}
      }
    }
  `,
);
