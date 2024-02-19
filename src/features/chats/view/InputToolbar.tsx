import { Send } from '@tamagui/lucide-icons';
import { FC, memo, useCallback, useRef } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { XStack } from 'tamagui';

export type InputToolbarProps = {
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
