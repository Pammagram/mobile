import { DocumentNode, gql } from '@apollo/client';

import { createGraphqlBuilder, DEFAULT_RESPONSE_NAME, UserDto } from '$shared';

export const createMe = createGraphqlBuilder<UserDto, DocumentNode>(
  (selection) => gql`
    query Me {
      ${DEFAULT_RESPONSE_NAME}: me {
        ${selection}
      }
    }
  `,
);
