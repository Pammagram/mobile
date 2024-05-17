import { Href, router } from 'expo-router';
import moment from 'moment';
import { FC } from 'react';
import { PressableProps } from 'react-native';
import { Avatar, XStack, YStack } from 'tamagui';

import { ChatDto, ChatType, Maybe, MessageDto } from '$core/graphql';
import { Pressable } from '$modules/common/components/Pressable';
import { Text } from '$modules/common/components/Text';
import { useCurrentUser } from '$modules/user';

type LastMessage = Pick<MessageDto, 'text' | 'createdAt'> & {
  sender: Pick<MessageDto['sender'], 'username'>;
};

type Props = Pick<PressableProps, 'onLongPress'> & {
  chat: Pick<ChatDto, 'type' | 'title' | 'id' | 'members'>;
  lastMessage?: Maybe<LastMessage>;
};

export const ChatCard: FC<Props> = (props) => {
  const { chat, onLongPress, lastMessage } = props;
  const { user } = useCurrentUser();

  const onPress = (chatId: number) => {
    router.push(`chat/${chatId}` as Href<string>);
  };

  const chatTitle =
    chat.type === ChatType.Private
      ? chat.members.find((member) => member.id !== user?.id)?.username
      : chat.title;

  const lastMessageDate = moment(lastMessage?.createdAt);

  const isCurrentDay = lastMessageDate.isSame(moment(new Date()), 'day');
  const isCurrentWeek = lastMessageDate.isSame(moment(new Date()), 'week');
  const isCurrentYear = lastMessageDate.isSame(moment(new Date()), 'year');

  let dateToDisplay: string | undefined;

  if (isCurrentDay) {
    dateToDisplay = lastMessageDate.format('HH:MM');
  } else if (isCurrentWeek) {
    dateToDisplay = lastMessageDate.format('dddd');
  } else if (isCurrentYear) {
    dateToDisplay = lastMessageDate.format('DD.MM');
  } else {
    dateToDisplay = lastMessageDate.format('DD.MM.YYYY');
  }

  return (
    <Pressable
      onPress={() => onPress(chat.id)}
      onLongPress={onLongPress}
      key={chat.id}
    >
      <XStack gap={15} h={80} p={10}>
        <Avatar circular size={48}>
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <YStack gap={5} f={1}>
          <XStack jc="space-between" ai="center">
            <Text fontSize={16} fontWeight="500">
              {chatTitle}
            </Text>
            <Text fontSize={12} color="grey">
              {dateToDisplay}
            </Text>
          </XStack>
          <Text fontSize={14} color="grey">
            {lastMessage?.text}
          </Text>
        </YStack>
      </XStack>
    </Pressable>
  );
};
