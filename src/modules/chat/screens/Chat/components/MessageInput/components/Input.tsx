import { forwardRef, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { TextArea, TextAreaProps } from 'tamagui';

type Props = Pick<TextAreaProps, 'onChangeText'>;

const MIN_INPUT_HEIGHT = 24;
const MAX_INPUT_HEIGHT = 200;

const ONE_LINE_BORDER_RADIUS = 16;
const MULTIPLE_LINE_BORDER_RADIUS = 8;

export const Input = forwardRef<TextInput, Props>((props, inputRef) => {
  const { onChangeText } = props;
  const [inputHeight, setInputHeight] = useState(MIN_INPUT_HEIGHT);
  const initialInputHeightRef = useRef<number>(0);

  const borderRadius =
    inputHeight > initialInputHeightRef.current
      ? MULTIPLE_LINE_BORDER_RADIUS
      : ONE_LINE_BORDER_RADIUS;

  return (
    <TextArea
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;

        if (!initialInputHeightRef.current) {
          initialInputHeightRef.current = height;
        }

        setInputHeight(height);
      }}
      borderRadius={borderRadius}
      numberOfLines={5}
      style={{ minHeight: MIN_INPUT_HEIGHT, maxHeight: MAX_INPUT_HEIGHT }}
      flex={1}
      ref={inputRef}
      onChangeText={onChangeText}
      placeholder="Enter your message..."
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="default"
      minHeight={24}
      paddingHorizontal={8}
      paddingVertical={5}
      justifyContent="center"
      m={0}
    />
  );
});
