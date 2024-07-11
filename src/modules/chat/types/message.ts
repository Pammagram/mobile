import { ChatMessage } from '$modules/chats/graphql';

export enum MessageStatus {
  Pending = 'pending',
  Sent = 'sent',
  Failed = 'failed',
}

export type SentMessage = ChatMessage;

export type Message = SentMessage;
