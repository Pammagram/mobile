import { ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const createAuthLink = (): ApolloLink => {
  // TODO must be updated with proper auth parameters.
  return setContext((_, { headers }) => {
    return {
      headers: headers as Record<string, string>,
    };
  });
};
