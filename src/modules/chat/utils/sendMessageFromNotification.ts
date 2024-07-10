import { serverConfig } from '$configs';

type Params = {
  chatId: number;
  text: string;
};

export const sendMessageFromNotification = async (
  params: Params,
): Promise<void> => {
  const { chatId, text } = params;

  await fetch(serverConfig.apiUrl, {
    method: 'POST',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention -- http header
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation {sendMessage(input: {chatId: ${chatId},text: "${text}" }) {data {text}}}`,
    }),
  });
};
