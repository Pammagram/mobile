import { Href, router } from 'expo-router';
import { FC } from 'react';
import { Pressable, PressableProps } from 'react-native';
import { Text, View } from 'tamagui';

import { ChatDto, ChatType } from '$core/graphql';
import { useCurrentUser } from '$modules/user';

type Props = Pick<PressableProps, 'onLongPress'> & {
  chat: Pick<ChatDto, 'type' | 'title' | 'id' | 'members'>;
};

export const ChatCard: FC<Props> = (props) => {
  const { chat, onLongPress } = props;
  const { user } = useCurrentUser();

  const onPress = (chatId: number) => {
    router.push(`chat/${chatId}` as Href<string>); // TODO create builder for routes
  };

  return (
    <Pressable
      onPress={() => onPress(chat.id)}
      onLongPress={onLongPress}
      key={chat.id}
    >
      <View
        h={80}
        display="flex"
        fd="row"
        jc="space-between"
        backgroundColor="#d6d6cd"
      >
        <Text fontSize={20}>
          {chat.type === ChatType.Private
            ? chat.members.find((member) => member.id !== user?.id)?.username
            : chat.title}
        </Text>
        <Text>{chat.id}</Text>
        <Text>Members: {chat.members.length}</Text>
        <Text>Type: {chat.type}</Text>
      </View>
    </Pressable>
  );
};
