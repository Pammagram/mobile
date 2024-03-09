import { DocumentNode, gql } from '@apollo/client';
import { createGraphqlBuilder } from 'gql-ts-builder';

import { DEFAULT_RESPONSE_NAME } from '$core/apollo';
import { SendSmsOutput } from '$core/graphql';

export const createSendSms = createGraphqlBuilder<SendSmsOutput, DocumentNode>(
  (selection) => gql`
    mutation SendSms($input: SendSmsInput!) {
      ${DEFAULT_RESPONSE_NAME}: sendSms(input: $input) {
        ${selection}
      }
    }
  `,
);
