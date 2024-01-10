import { ApolloLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { serverConfig } from '$configs';

export const createWebsocketLink = (): ApolloLink | null => {
  // * This is need because of SSR, it accesses 'window' property, which does not exist on server
  // * https://stackoverflow.com/questions/72116940/apollo-graphql-graphqlwslink-subscriptions-troubles-cannot-get-websocket-imp
  if (typeof window === 'undefined') {
    return null;
  }

  const { apiUrl: url } = serverConfig;

  const link = new GraphQLWsLink(
    createClient({
      url,
      shouldRetry: () => true,
      // TODO must be updated with proper auth parameters.
      connectionParams: () => ({}),
    }),
  );

  return link;
};
