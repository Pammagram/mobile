import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { UpdateUserOutput } from '$core/graphql';

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
