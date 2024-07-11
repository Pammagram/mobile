import { Paperclip } from '@tamagui/lucide-icons';
import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '$core/components';

export const AttachButton: FC = () => {
  return (
    <View style={styles.container}>
      <Paperclip color="black" size={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 33, justifyContent: 'center' },
});
