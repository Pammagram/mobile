import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { RemoveSessionOutput } from '$core/graphql';

export const createRemoveSession = createGraphqlBuilder<
  RemoveSessionOutput,
  DocumentNode
>(
  (selection) => gql`
    mutation RemoveSession ($input: RemoveSessionInput!) {
      ${DEFAULT_RESPONSE_NAME}: removeSession(input: $input) {
        ${selection}
      }
    }
  `,
);
