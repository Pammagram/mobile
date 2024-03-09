import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { MeOutput } from '$core/graphql';

export const createMe = createGraphqlBuilder<MeOutput, DocumentNode>(
  (selection) => gql`
    query Me {
      ${DEFAULT_RESPONSE_NAME}: me {
        ${selection}
      }
    }
  `,
);
