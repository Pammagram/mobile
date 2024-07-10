import { useCallback } from 'react';

import { useSendMessage as useSendMessageMutation } from '../graphql/mutations/sendMessage';

export const useSendMessage = () => {
  const { sendMessage } = useSendMessageMutation();

  const sendMessageHandler = useCallback(
    async (params: Parameters<(typeof sendMessage)['request']>[0]['input']) => {
      await sendMessage.request({
        input: params,
      });
    },
    [sendMessage],
  );

  return {
    sendMessage: sendMessageHandler,
  };
};
