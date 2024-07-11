import moment from 'moment';

import { ChatMessage } from '$modules/chats/graphql';

export const getShouldShowTimeStamp = (
  currentMessage: ChatMessage,
  nextMessage?: ChatMessage,
): boolean => {
  const currentTimestamp = moment(currentMessage.createdAt);

  const nextTimestamp = nextMessage ? moment(nextMessage.createdAt) : undefined;

  const shouldShow =
    !nextMessage || !moment(currentTimestamp).isSame(nextTimestamp, 'day');

  return shouldShow;
};
