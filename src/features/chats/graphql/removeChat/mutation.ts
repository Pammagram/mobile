import { createRemoveChat } from '$entities';
import { InferSelection } from '$shared';

export const REMOVE_CHAT_PREFIX = 'removeChat';

export const REMOVE_CHAT_MUTATION = createRemoveChat({
  data: true,
});

export type RemoveChatData = InferSelection<typeof REMOVE_CHAT_MUTATION>;
