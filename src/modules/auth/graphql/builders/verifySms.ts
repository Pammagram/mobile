import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo';
import { VerifySmsOutput } from '$core/graphql';

export const createVerifySms = createGraphqlBuilder<
  VerifySmsOutput,
  DocumentNode
>(
  (selection) => gql`
    mutation VerifySms($input: VerifySmsInput!) {
      ${DEFAULT_RESPONSE_NAME}: verifySms(input: $input) {
        ${selection}
      }
    }
  `,
);
