import { Colors } from 'configs/constants';
import { FC, memo, useCallback, useRef } from 'react';
import { GestureResponderEvent, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack } from 'tamagui';

import { AttachButton } from './components/AttachButton';
import { Input } from './components/Input';
import { SendButton } from './components/SendButton';

import { SendMessage } from '../../types';

export type InputToolbarProps = {
  onSendMessage: SendMessage;
};

export const MessageInput: FC<InputToolbarProps> = memo((props) => {
  const { onSendMessage } = props;

  const inputRef = useRef<TextInput>(null);
  const { bottom } = useSafeAreaInsets();
  const textRef = useRef<string>('');

  const pressHandler = useCallback(
    async (
      event: Pick<GestureResponderEvent, 'preventDefault' | 'stopPropagation'>,
    ) => {
      event.preventDefault();
      inputRef.current?.clear();
      inputRef.current?.focus();
      await onSendMessage({ text: textRef.current });
    },
    [onSendMessage],
  );

  const changeTextHandler = useCallback((text: string) => {
    textRef.current = text;
  }, []);

  return (
    <XStack
      paddingHorizontal={15}
      backgroundColor={Colors.SECONDARY_RED}
      justifyContent="space-between"
      alignItems="flex-end"
      gap={15}
      paddingTop={10}
      paddingBottom={bottom}
    >
      <AttachButton />
      <Input onChangeText={changeTextHandler} ref={inputRef} />
      <SendButton onPress={pressHandler} />
    </XStack>
  );
});
