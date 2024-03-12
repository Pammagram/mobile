import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { MySessionsOutput } from '$core/graphql';

export const createMySessions = createGraphqlBuilder<
  MySessionsOutput,
  DocumentNode
>(
  (selection) => gql`
    query MySessions {
      ${DEFAULT_RESPONSE_NAME}: mySessions {
        ${selection}
      }
    }
  `,
);
