import { InferSelection } from 'gql-ts-builder';

import {
  GraphQlInput,
  useCustomLazyQuery,
  UseLazyQueryWrapper,
} from '$core/apollo';
import { UsersByPhoneNumbersInput } from '$core/graphql';
import { createUsersByPhoneNumbersQuery } from '$core/graphql/builder/queries/usersByPhoneNumber';

export const PREFIX = 'usersByPhoneNumbers';

export const query = createUsersByPhoneNumbersQuery({
  users: {
    id: true,
    lastActiveInMs: true,
    phoneNumber: true,
    username: true,
  },
});

export type Data = InferSelection<typeof query>;

type Hook = UseLazyQueryWrapper<
  typeof PREFIX,
  Data,
  GraphQlInput<UsersByPhoneNumbersInput>
>;

export const useLazyUsersByPhoneNumbers: Hook = (...args) =>
  useCustomLazyQuery(PREFIX, query, ...args);
