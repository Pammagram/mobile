import { FC } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import { MessageInput } from './components/MessageInput';
import { Messages } from './components/Messages';
import { useLogic } from './useLogic';

const KEYBOARD_OFFSET = 60;

export const ChatScreen: FC = () => {
  const { sendMessage, flatListRef } = useLogic();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.container}
      keyboardVerticalOffset={KEYBOARD_OFFSET}
      behavior={Platform.OS === 'ios' ? 'position' : undefined}
    >
      <Messages ref={flatListRef} />
      <MessageInput onSendMessage={sendMessage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
