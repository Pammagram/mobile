import { InferSelection } from 'gql-ts-builder';

import { createRemoveChat } from '../../builders';

export const REMOVE_CHAT_PREFIX = 'removeChat';

export const REMOVE_CHAT_MUTATION = createRemoveChat({
  data: {
    id: true,
  },
});

export type RemoveChatData = InferSelection<typeof REMOVE_CHAT_MUTATION>;
