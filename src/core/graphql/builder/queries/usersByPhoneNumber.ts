import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo/constants';
import { UsersByPhoneNumbersOutput } from '$core/graphql';

export const createUsersByPhoneNumbersQuery = createGraphqlBuilder<
  UsersByPhoneNumbersOutput,
  DocumentNode
>(
  (selection) => gql`
    query UsersByPhoneNumbers ($input: UsersByPhoneNumbersInput!) {
      ${DEFAULT_RESPONSE_NAME}: usersByPhoneNumbers (input: $input) {
        ${selection}
      }
    }
  `,
);
