import { ApolloLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql';

import { createAuthLink } from './auth';
import { createErrorLink } from './error';
import { createHttpLink } from './http';
import { createWebsocketLink } from './websocket';

export const createLink = (): ApolloLink => {
  const authLink = createAuthLink();
  const httpLink = createHttpLink();
  const errorLink = createErrorLink();
  const wsLink = createWebsocketLink();

  const extendedWsLink = wsLink ? errorLink.concat(wsLink) : errorLink;
  const extendedHttpLink = authLink.concat(errorLink).concat(httpLink);

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);

      return (
        definition.kind === Kind.OPERATION_DEFINITION &&
        definition.operation === OperationTypeNode.SUBSCRIPTION
      );
    },
    extendedWsLink,
    extendedHttpLink,
  );

  return link;
};
