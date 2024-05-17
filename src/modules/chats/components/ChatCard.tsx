import { Href, router } from 'expo-router';
import { FC } from 'react';
import { PressableProps } from 'react-native';
import { Avatar, XStack, YStack } from 'tamagui';

import { ChatDto, ChatType } from '$core/graphql';
import { Pressable } from '$modules/common/components/Pressable';
import { Text } from '$modules/common/components/Text';
import { useCurrentUser } from '$modules/user';

type Props = Pick<PressableProps, 'onLongPress'> & {
  chat: Pick<ChatDto, 'type' | 'title' | 'id' | 'members'>;
};

export const ChatCard: FC<Props> = (props) => {
  const { chat, onLongPress } = props;
  const { user } = useCurrentUser();

  const onPress = (chatId: number) => {
    router.push(`chat/${chatId}` as Href<string>);
  };

  const chatTitle =
    chat.type === ChatType.Private
      ? chat.members.find((member) => member.id !== user?.id)?.username
      : chat.title;

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
        <YStack gap={5}>
          <XStack jc="space-between">
            <Text fontSize={16} fontWeight="500">
              {chatTitle}
            </Text>
            <Text color="grey">15:17</Text>
          </XStack>
          <Text fontSize={14} color="grey">
            Last testing message, nothing to see here yet
          </Text>
        </YStack>
      </XStack>
    </Pressable>
  );
};
