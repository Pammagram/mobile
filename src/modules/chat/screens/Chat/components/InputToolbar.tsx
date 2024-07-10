import { Paperclip, Send } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { FC, memo, useCallback, useRef } from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextArea, XStack } from 'tamagui';

import { SendMessage } from '../types';

import { TouchableOpacity } from '$core/components';

export type InputToolbarProps = {
  onSendMessage: SendMessage;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export const InputToolbar: FC<InputToolbarProps> = memo((props) => {
  const { onSendMessage, onLayout } = props;

  const textRef = useRef<string>('');
  const inputRef = useRef<TextInput>(null);
  const { bottom } = useSafeAreaInsets();

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
      onLayout={onLayout}
      paddingHorizontal={15}
      backgroundColor={Colors.SECONDARY_RED}
      justifyContent="space-between"
      alignItems="center"
      gap={15}
      paddingTop={10}
      paddingBottom={bottom}
    >
      <Paperclip color="black" />
      <TextArea
        flex={1}
        ref={inputRef}
        onChangeText={changeTextHandler}
        placeholder="Enter your message..."
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="default"
      />
      <TouchableOpacity onPress={pressHandler}>
        <Send color="black" />
      </TouchableOpacity>
    </XStack>
  );
});
