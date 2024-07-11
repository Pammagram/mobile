import { Send } from '@tamagui/lucide-icons';
import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { TouchableOpacity, TouchableOpacityProps } from '$core/components';

type Props = Pick<TouchableOpacityProps, 'onPress' | 'disabled'>;

export const SendButton: FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
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
    height: 33,
  },
});
