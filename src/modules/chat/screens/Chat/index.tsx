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

import { useChatLayout } from '../../layout/Chat';

import { InputToolbar, MessagesContainer } from '$features';

export * from '../../layout/Chat';

export const ChatScreen: FC = () => {
  const { sendMessage } = useLogic();

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

  const onMessageContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const newHeight = event.nativeEvent.layout.height;

      if (newHeight === messagesContainerHeight) {
        return;
      }

      setMessagesContainerHeight(newHeight);
    },
    [messagesContainerHeight],
  );

  const onInputLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const newHeight = event.nativeEvent.layout.height;

      if (newHeight === inputHeight) {
        return;
      }

      setInputHeight(newHeight);
    },
    [inputHeight],
  );

  const messagesContainerHeightWithoutInput =
    messagesContainerHeight - inputHeight;

  return (
    <View
      style={{
        overflow: 'hidden',
        flex: 1,
      }}
      onLayout={onMessageContainerLayout}
    >
      <KeyboardAvoidingView
        // eslint-disable-next-line no-magic-numbers -- we need to increase offset because of keyboard
        keyboardVerticalOffset={bottom * 2.3}
        behavior="position"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View style={{ height: messagesContainerHeightWithoutInput }}>
              <MessagesContainer ref={flatListRef} />
            </View>
            <InputToolbar onLayout={onInputLayout} onSubmit={onSendHandler} />
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
