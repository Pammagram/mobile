import { ApolloLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { serverConfig } from '$configs';

export const createWebsocketLink = (): ApolloLink | null => {
  const { apiUrl } = serverConfig;

  const link = new GraphQLWsLink(
    createClient({
      url: apiUrl.replace('http', 'ws'),
    }),
  );

  return link;
};
