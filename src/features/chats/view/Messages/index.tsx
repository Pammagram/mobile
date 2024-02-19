import { Colors } from 'configs/constants';
import { useLocalSearchParams } from 'expo-router';
import { useChatMessages } from 'features/chats/logic';
import { ChatMessage } from 'features/chats/logic/fetchChatMessages/graphql/query';
import { useCurrentUser } from 'features/currentUser';
import { FC, forwardRef, memo, Ref, useMemo } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Spinner, Text, View, XStack } from 'tamagui';

import { StrictType } from '$shared';

// TODO to util
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

export type MessagesContainerProps = {};

export const MessagesContainer = memo(
  forwardRef(
    (props: MessagesContainerProps, ref: Ref<FlatList<ChatMessage>>) => {
      // const {} = props;

      const { chatId } = useLocalSearchParams<{ chatId: string }>();

      const { getChatMessages } = useChatMessages({
        variables: {
          input: {
            chatId: Number(chatId),
          },
        },
      });

      const { loading: areMessagesLoading } = getChatMessages;

      const messages = useMemo(
        () => [...(getChatMessages.data?.data || [])].reverse(),
        [getChatMessages.data?.data],
      );

      const { user } = useCurrentUser<StrictType.NOT_STRICT>();

      return (
        <>
          {areMessagesLoading && (
            <View flex={1} justifyContent="center">
              <Spinner />
            </View>
          )}
          {!areMessagesLoading && messages && (
            <FlatList
              maxToRenderPerBatch={30}
              ref={ref}
              inverted
              showsVerticalScrollIndicator={false}
              data={messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item: message, index }) => (
                <Message
                  isFromMe={message.sender.id === user?.id}
                  showAvatar={
                    messages[index - 1]?.sender.id !== message.sender.id
                  }
                  message={message} // TODO fix typings
                />
              )}
            />
          )}
        </>
      );
    },
  ),
);
