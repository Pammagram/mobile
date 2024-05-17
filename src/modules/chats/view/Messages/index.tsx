import { Colors } from 'configs/constants';
import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import { FC, forwardRef, memo, Ref, useEffect, useMemo, useRef } from 'react';
import { Animated, FlatList, Keyboard } from 'react-native';
import { Avatar, Spinner, Text, View, XStack } from 'tamagui';

import { stringToColor } from '$core/utils';
import { ChatMessage, useChatMessages } from '$modules/chats/graphql/documents';
import { useMe } from '$modules/user';

type UserAvatarProps = {
  isVisible: boolean;
  initials?: string;
};

const Spacer: FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const decreaseHeight = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const increaseHeight = (keyboardHeight: number) => {
    Animated.timing(fadeAnim, {
      toValue: keyboardHeight,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const cleanup = Keyboard.addListener('keyboardWillShow', (event) => {
      const {
        endCoordinates: { height },
      } = event;

      increaseHeight(height);
    });

    return () => {
      cleanup.remove();
    };
  }, []);

  useEffect(() => {
    const cleanup = Keyboard.addListener('keyboardWillHide', decreaseHeight);

    return () => {
      cleanup.remove();
    };
  }, []);

  return (
    <Animated.View
      style={{
        height: fadeAnim,
      }}
    />
  );
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
  const { message, showAvatar = true, isFromMe = true } = props;

  return (
    <XStack
      paddingHorizontal={10}
      paddingVertical={5}
      gap={5}
      justifyContent={isFromMe ? 'flex-end' : 'flex-start'}
      marginLeft={isFromMe ? '$6' : 0}
      marginRight={!isFromMe ? '$11' : 0}
      alignItems="flex-end"
    >
      {!isFromMe && (
        <UserAvatar
          initials={message.sender.username?.[0]}
          isVisible={showAvatar}
        />
      )}
      <XStack
        backgroundColor={isFromMe ? Colors.PRIMARY_BLUE : Colors.TERNARY_BLUE}
        borderRadius={10}
        padding={10}
        gap={5}
        flexWrap="wrap"
        alignItems="flex-end"
      >
        <Text textBreakStrategy="highQuality">{message.text}</Text>
        <XStack gap={2} marginLeft="auto" flexWrap="wrap">
          {/* <Text fontSize={8} color="white">
            edited
          </Text> */}
          <Text fontSize={8} color="white">
            {
              moment(message.createdAt).format('HH:mm')
              // TODO to utils in one place
            }
          </Text>
        </XStack>
      </XStack>
    </XStack>
  );
};

export const MessagesContainer = memo(
  forwardRef((_props, ref: Ref<FlatList<ChatMessage>>) => {
    const { chatId } = useLocalSearchParams<{ chatId: string }>();

    const { getChatMessages } = useChatMessages({
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
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

    const {
      getMe: { data: user },
    } = useMe({
      fetchPolicy: 'cache-only',
    });

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
            ListFooterComponent={<Spacer />}
            showsVerticalScrollIndicator={false}
            data={messages}
            initialNumToRender={15}
            renderItem={({ item: message, index }) => {
              const RenderedMessage = () => (
                <Message
                  isFromMe={message.sender.id === user?.data?.id}
                  showAvatar={
                    messages[index - 1]?.sender.id !== message.sender.id
                  }
                  message={message}
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
