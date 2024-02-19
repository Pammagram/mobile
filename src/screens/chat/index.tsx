import { useChatLayout } from 'app/chats/_layout';
import { FC, useCallback, useRef } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLogic } from './useLogic';

import { InputToolbar, MessagesContainer } from '$features';

let rerenders = 0;

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

  const { bottom } = useSafeAreaInsets();

  const {
    inputHeight,
    messagesContainerHeight,
    setInputHeight,
    setMessagesContainerHeight,
  } = useChatLayout();

  const onMessageContainerLayout = useCallback((event: LayoutChangeEvent) => {
    setMessagesContainerHeight(event.nativeEvent.layout.height);
  }, []);

  const onInputLayout = useCallback((params: LayoutChangeEvent) => {
    setInputHeight(params.nativeEvent.layout.height);
  }, []);

  const messagesContainerHeightWithoutInput =
    messagesContainerHeight - inputHeight;

  rerenders++;

  console.log('rerender', rerenders);

  return (
    <View
      style={{
        overflow: 'hidden',
        flex: 1,
      }}
      onLayout={onMessageContainerLayout}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={bottom * 2}
        behavior="position"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View
              style={{
                height: messagesContainerHeightWithoutInput,
              }}
            >
              {/* {areMessagesLoading && <Spinner />} */}
              {!areMessagesLoading && messages && (
                <MessagesContainer
                  ref={flatListRef}
                  isFromMe={(message) => message.sender.id === user?.id}
                  messages={messages}
                />
              )}
            </View>
            <InputToolbar onLayout={onInputLayout} onSubmit={onSendHandler} />
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
