import { Text, YGroup } from 'tamagui';

import { useLogic } from './useLogic';

import { ChatType } from '$core/graphql';
import { useMe } from '$modules/user';

export const ChatTitle = () => {
  const { getChat } = useLogic();

  const { getMe } = useMe({});

  const chat = getChat.data?.data;

  const chatName =
    chat?.type === ChatType.Private
      ? chat.members.find((member) => member.id !== getMe.data?.data?.id)
          ?.username
      : chat?.title;

  return (
    <YGroup alignItems="center" flex={1}>
      <Text>{chatName}</Text>
    </YGroup>
  );
};
