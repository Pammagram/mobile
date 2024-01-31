import { DocumentNode, gql } from '@apollo/client';

import {
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
  VerifySmsOutput,
} from '$shared';

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
