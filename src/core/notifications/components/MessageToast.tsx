import { FC } from 'react';
import { BaseToastProps } from 'react-native-toast-message';

import { Image } from '$core/components/Atoms/Image';
import { View } from '$core/components/Atoms/View';
import { YStack } from '$core/components/Atoms/YStack';
import { Text } from '$core/components/Text';

export const MessageToast: FC<BaseToastProps> = (props) => {
  const { text1, text2 } = props;

  return (
    <View
      width="90%"
      bg="#DDDDDD"
      paddingHorizontal={16}
      paddingVertical={16}
      flexDirection="row"
      alignItems="center"
      gap={16}
      borderRadius={16}
    >
      <Image
        source="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
        style={{ height: 52, width: 52, borderRadius: 100 }}
      />
      <YStack>
        <Text fontSize={16} fontWeight={600}>
          {text1}
        </Text>
        <Text>{text2}</Text>
      </YStack>
    </View>
  );
};
