import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { SetMessagingTokenOutput } from '$core/graphql';

export const createSetMessagingToken = createGraphqlBuilder<
  SetMessagingTokenOutput,
  DocumentNode
>(
  (selection) => gql`
    mutation SetMessagingToken ($input: SetMessagingTokenInput!) {
      ${DEFAULT_RESPONSE_NAME}: setMessagingToken(input: $input) {
        ${selection}
      }
    }
  `,
);
