import { DocumentNode, gql } from '@apollo/client';

import { createGraphqlBuilder, DEFAULT_RESPONSE_NAME, MeOutput } from '$shared';

export const createMe = createGraphqlBuilder<MeOutput, DocumentNode>(
  (selection) => gql`
    query Me {
      ${DEFAULT_RESPONSE_NAME}: me {
        ${selection}
      }
    }
  `,
);
