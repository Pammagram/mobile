import { Send } from '@tamagui/lucide-icons';
import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { TouchableOpacity, TouchableOpacityProps } from '$core/components';

type Props = Pick<TouchableOpacityProps, 'onPress'>;

export const SendButton: FC<Props> = (props) => {
  const { onPress } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Send
        style={{ transform: [{ translateX: -1 }] }}
        size={20}
        color="black"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
  },
});
