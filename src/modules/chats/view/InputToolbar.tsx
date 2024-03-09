import { Paperclip, Send } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { FC, memo, useCallback, useRef } from 'react';
import { LayoutChangeEvent, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, XStack } from 'tamagui';

export type InputToolbarProps = {
  onSubmit: (text: string) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export const InputToolbar: FC<InputToolbarProps> = memo((props) => {
  const { onSubmit, onLayout } = props;

  const textRef = useRef<string>('');
  const inputRef = useRef<TextInput>(null);
  const { bottom } = useSafeAreaInsets();

  const pressHandler = useCallback(() => {
    onSubmit(textRef.current);

    inputRef.current?.clear();
  }, [onSubmit]);

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
      marginTop={5}
    >
      <Paperclip color="black" />
      <Input
        flex={1}
        ref={inputRef}
        onChangeText={changeTextHandler}
        placeholder="Enter your message..."
      />
      <TouchableOpacity onPress={pressHandler}>
        <Send color="black" />
      </TouchableOpacity>
    </XStack>
  );
});
