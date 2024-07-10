import { FC } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InputToolbar } from './components/InputToolbar';
import { Messages } from './components/Messages';
import { useLogic } from './useLogic';

export const ChatScreen: FC = () => {
  const { sendMessage, flatListRef } = useLogic();
  const { bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      // eslint-disable-next-line no-magic-numbers
      keyboardVerticalOffset={bottom * 2.3}
      behavior={Platform.OS === 'ios' ? 'position' : undefined}
    >
      <Messages ref={flatListRef} />
      <InputToolbar onSendMessage={sendMessage} />
    </KeyboardAvoidingView>
  );
};
