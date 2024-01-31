import { DocumentNode, gql } from '@apollo/client';

import {
  createGraphqlBuilder,
  DEFAULT_RESPONSE_NAME,
  SendSmsOutput,
} from '$shared';

export const createSendSms = createGraphqlBuilder<SendSmsOutput, DocumentNode>(
  (selection) => gql`
    mutation SendSms($input: SendSmsInput!) {
      ${DEFAULT_RESPONSE_NAME}: sendSms(input: $input) {
        ${selection}
      }
    }
  `,
);
