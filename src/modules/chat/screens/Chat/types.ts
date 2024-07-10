export type SendMessageParams = {
  text: string;
};

export type SendMessage = (params: SendMessageParams) => Promise<void>;
