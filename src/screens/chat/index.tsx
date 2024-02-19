import { FC, useCallback } from 'react';
import { FlatList, KeyboardAvoidingView, SafeAreaView } from 'react-native';
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

  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        overflow: 'hidden',
        flex: 1,
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
        <InputToolbar onSubmit={onSendHandler} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
