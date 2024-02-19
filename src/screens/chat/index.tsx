import { FC, useCallback, useRef } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner } from 'tamagui';

import { useLogic } from './useLogic';

import { InputToolbar, MessagesContainer } from '$features';

export const ChatScreen: FC = () => {
  const { getChatMessages, sendMessage, messages, user } = useLogic();
  const { loading: areMessagesLoading } = getChatMessages;
  const flatListRef = useRef<FlatList>(null);

  const onSendHandler = useCallback(
    (text: string) => {
      void sendMessage({ text });

      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    },
    [flatListRef],
  );

  const inputToolBarHeightRef = useRef<number>(0);
  const safeAreaViewHeightRef = useRef<number>(0);

  const { bottom } = useSafeAreaInsets();

  const messagesContainerHeight =
    safeAreaViewHeightRef.current - inputToolBarHeightRef.current - bottom;

  return (
    <SafeAreaView
      style={{
        overflow: 'hidden',
        flex: 1,
      }}
      onLayout={(params) => {
        safeAreaViewHeightRef.current = params.nativeEvent.layout.height;
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          marginBottom: bottom,
        }}
        keyboardVerticalOffset={140}
        behavior="position"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            {areMessagesLoading && <Spinner />}
            {!areMessagesLoading && (
              <MessagesContainer
                ref={flatListRef}
                isFromMe={(message) => message.sender.id === user?.id}
                height={messagesContainerHeight}
                messages={messages}
              />
            )}
            <InputToolbar
              onLayout={(params) => {
                inputToolBarHeightRef.current =
                  params.nativeEvent.layout.height;
              }}
              onSubmit={onSendHandler}
            />
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
