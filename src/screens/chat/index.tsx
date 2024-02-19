import { Send } from '@tamagui/lucide-icons';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner, Text, XStack } from 'tamagui';

import { useLogic } from './useLogic';

import { MessageDto } from '$shared';

export const ChatScreen: FC = () => {
  const { getChatMessages, sendMessage } = useLogic();
  const { data: messagesData, loading: areMessagesLoading } = getChatMessages;

  const flatListRef = useRef<FlatList<MessageDto>>(null);

  const onSendHandler = useCallback((text: string) => {
    void sendMessage({ text });
  }, []);

  useEffect(() => {
    if (!flatListRef) {
      return;
    }

    flatListRef.current?.scrollToEnd({
      animated: false,
    });
  }, [flatListRef]);

  const { bottom } = useSafeAreaInsets();

  const messages = useMemo(
    () => [...(messagesData?.data || [])].reverse(),
    [messagesData?.data],
  );

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
          <FlatList<MessageDto>
            inverted
            // initialScrollIndex={messagesData?.data.length - 1}
            ref={flatListRef}
            data={messages as MessageDto[]}
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

type InputToolbarProps = {
  onSubmit: (text: string) => void;
};

export const InputToolbar: FC<InputToolbarProps> = memo((props) => {
  const { onSubmit } = props;

  const textRef = useRef<string>('');
  const inputRef = useRef<TextInput>(null);

  const pressHandler = useCallback(() => {
    onSubmit(textRef.current);
    inputRef.current?.clear();
  }, [onSubmit]);

  const changeTextHandler = useCallback((text: string) => {
    textRef.current = text;
  }, []);

  return (
    <XStack padding={10} justifyContent="space-between">
      <TextInput
        ref={inputRef}
        onChangeText={changeTextHandler}
        placeholder="test"
        style={{ flex: 1 }}
      />
      <TouchableOpacity onPress={pressHandler}>
        <Send color="black" />
      </TouchableOpacity>
    </XStack>
  );
});
