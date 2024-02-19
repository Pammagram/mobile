import { Colors } from 'configs/constants';
import { ChatMessage } from 'features/chats/logic/fetchChatMessages/graphql/query';
import { FC, forwardRef, Ref } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Text, View, XStack } from 'tamagui';

const stringToColor = (str: string) => {
  let hash = 0;

  for (let index = 0; index < str.length; index++) {
    // eslint-disable-next-line no-bitwise, no-magic-numbers -- generator fo color
    hash = str.charCodeAt(index) + ((hash << 5) - hash);
  }

  const seconds = 360;

  const h = hash % seconds;

  return `hsl(${h}, 30%, 80%)`;
};

type UserAvatarProps = {
  isVisible: boolean;
  initials?: string;
};

const UserAvatar: FC<UserAvatarProps> = (props) => {
  const { isVisible, initials } = props;

  return (
    <Avatar
      style={{ opacity: isVisible ? '100' : 0 }}
      backgroundColor={initials ? stringToColor(initials) : undefined}
      circular
      size="$2.5"
    >
      {initials && <Text>{initials}</Text>}
      {!initials && (
        <>
          <Avatar.Image src="http://placekitten.com/200/300" />
          <Avatar.Fallback bc="red" />
        </>
      )}
    </Avatar>
  );
};

type MessageTextProps = {
  text: string;
};

const MessageText: FC<MessageTextProps> = (props) => {
  const { text } = props;

  return (
    <View
      backgroundColor={Colors.PRIMARY_BLUE}
      borderRadius={10}
      maxWidth="80%"
      padding={10}
    >
      <Text>{text}</Text>
    </View>
  );
};

export type MessageProps = {
  message: ChatMessage;
  isFromMe?: boolean;
  showAvatar?: boolean;
};

// TODO add avatar and etc.
export const Message: FC<MessageProps> = (props) => {
  const { message, showAvatar = true, isFromMe = false } = props;

  return (
    <XStack
      paddingHorizontal={10}
      paddingVertical={5}
      gap={5}
      justifyContent={isFromMe ? 'flex-end' : 'flex-start'}
    >
      {!isFromMe && (
        <UserAvatar
          initials={message.sender.username?.[0]}
          isVisible={showAvatar}
        />
      )}
      <MessageText text={message.text} />
    </XStack>
  );
};

export type MessagesContainerProps = {
  isFromMe: (message: ChatMessage) => boolean;
  messages: ChatMessage[];

  height?: number;
};

export const MessagesContainer = forwardRef(
  (props: MessagesContainerProps, ref: Ref<FlatList<ChatMessage>>) => {
    const { height, messages, isFromMe } = props;

    return (
      <FlatList
        ref={ref}
        style={{ height }}
        inverted
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Message
            isFromMe={isFromMe(item)}
            showAvatar={messages[index - 1]?.sender.id !== item.sender.id}
            message={item} // TODO fix typings
          />
        )}
      />
    );
  },
);
