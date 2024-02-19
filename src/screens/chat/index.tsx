import { FC, useCallback, useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner, Text, XStack } from 'tamagui';

import { useLogic } from './useLogic';

import { InputToolbar } from '$features';

export const ChatScreen: FC = () => {
  const { getChatMessages, sendMessage, messages } = useLogic();
  const { loading: areMessagesLoading } = getChatMessages;

  const onSendHandler = useCallback((text: string) => {
    void sendMessage({ text });
  }, []);

  const inputToolBarHeightRef = useRef<number>(0);
  const safeAreaViewHeightRef = useRef<number>(0);

  const { bottom } = useSafeAreaInsets();

  const flatListHeight =
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
        {areMessagesLoading && <Spinner />}
        {!areMessagesLoading && (
          <FlatList
            style={{
              height: flatListHeight,
            }}
            inverted
            data={messages}
            renderItem={(props) => {
              const { item: message } = props;

              return (
                <XStack>
                  <Text>{message.text}</Text>
                </XStack>
              );
            }}
          />
        )}
        <InputToolbar
          onLayout={(params) => {
            inputToolBarHeightRef.current = params.nativeEvent.layout.height;
          }}
          onSubmit={onSendHandler}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
