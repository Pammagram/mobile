import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useEffect, useState } from 'react';

import { initializeApolloClient } from '../client';

export const useInitializeApolloClient = () => {
  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >();

  useEffect(() => {
    async function init() {
      const apolloClient = await initializeApolloClient();

      setClient(apolloClient);
    }

    init().catch(console.error);
  }, []);

  return {
    client,
  };
};
