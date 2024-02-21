import { Colors } from 'configs/constants';
import { useLocalSearchParams } from 'expo-router';
import { useChatMessages } from 'features/chats/graphql';
import { ChatMessage } from 'features/chats/graphql/chatMessages/query';
import { useCurrentUser } from 'features/user/graphql/currentUser';
import moment from 'moment';
import { FC, forwardRef, memo, Ref, useMemo } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Spinner, Text, View, XStack } from 'tamagui';

import { stringToColor } from '$core/utils';
import { StrictType } from '$shared';

type UserAvatarProps = {
  isVisible: boolean;
  initials?: string;
};

const UserAvatar: FC<UserAvatarProps> = (props) => {
  const { isVisible, initials } = props;

  return (
    <Avatar
      style={{ opacity: Number(isVisible) }}
      backgroundColor={initials && stringToColor(initials)}
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
      position="relative"
    >
      {!isFromMe && (
        <UserAvatar
          initials={message.sender.username?.[0]}
          isVisible={showAvatar}
        />
      )}
      <XStack
        backgroundColor={Colors.PRIMARY_BLUE}
        borderRadius={10}
        padding={10}
        gap={5}
        maxWidth="80%"
      >
        <Text>{message.text}</Text>
        <Text marginTop="auto" fontSize={8} color="white">
          {
            moment(message.createdAt).format('HH:mm')
            // TODO to utils in one place
          }
        </Text>
      </XStack>
    </XStack>
  );
};

// TODO separate
export const MessagesContainer = memo(
  forwardRef((_props, ref: Ref<FlatList<ChatMessage>>) => {
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
      () =>
        [...(getChatMessages.data?.data || [])].sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1,
        ),
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
            renderItem={({ item: message, index }) => {
              const RenderedMessage = () => (
                <Message
                  isFromMe={message.sender.id === user?.id}
                  showAvatar={
                    messages[index - 1]?.sender.id !== message.sender.id
                  }
                  message={message} // TODO fix typings
                />
              );

              const hasNextMessage = index + 1 < messages.length;
              const currentTimestamp = moment(messages[index].createdAt);

              if (!hasNextMessage) {
                return (
                  <>
                    <RenderedMessage />
                    <XStack justifyContent="center" flex={1}>
                      <Text bg="beige">
                        {currentTimestamp.format('MMM, D')}
                      </Text>
                    </XStack>
                  </>
                );
              }

              const nextTimestamp = moment(messages[index + 1].createdAt);

              const isSameDay = moment(currentTimestamp).isSame(
                nextTimestamp,
                'day',
              );

              // TODO test this

              return (
                <>
                  <RenderedMessage />
                  {!isSameDay && (
                    <XStack justifyContent="center" flex={1}>
                      <Text bg="beige">
                        {currentTimestamp.format('MMM, D')}
                      </Text>
                    </XStack>
                  )}
                </>
              );
            }}
          />
        )}
      </>
    );
  }),
);
