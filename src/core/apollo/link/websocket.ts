import { ApolloLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { serverConfig } from '$configs';

export const createWebsocketLink = (): ApolloLink | null => {
  // * This is need because of SSR, it accesses 'window' property, which does not exist on server
  // * https://stackoverflow.com/questions/72116940/apollo-graphql-graphqlwslink-subscriptions-troubles-cannot-get-websocket-imp
  // if (typeof window === 'undefined') {
  //   return null;
  // }

  const { apiUrl } = serverConfig;

  const link = new GraphQLWsLink(
    createClient({
      url: apiUrl.replace('http', 'ws'),
      // shouldRetry: () => true,
      // // TODO must be updated with proper auth parameters.
      connectionParams: {
        sessionId: '69c28764-476f-4801-896a-c2610523d01a', // TODO auth sessionId
      },
    }),
  );

  return link;
};
