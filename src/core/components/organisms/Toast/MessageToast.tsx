import { router } from 'expo-router';
import { FC } from 'react';
import { BaseToastProps } from 'react-native-toast-message';

import { Image } from '$core/components/atoms/Image';
import { Text } from '$core/components/atoms/Text';
import { TouchableOpacity } from '$core/components/atoms/TouchableOpacity';
import { View } from '$core/components/atoms/View';
import { YStack } from '$core/components/atoms/YStack';
import { RouteBuilder } from '$core/routes/routeBuilder';
import { Notification } from '$modules/notification/types/Notification';
import { hideNotification } from '$modules/notification/utils/notifications';

type Props = {
  props: Pick<Notification, 'data'>;
} & BaseToastProps;

export const MessageToast: FC<Props> = (props) => {
  const {
    text1,
    text2,
    props: { data },
  } = props;

  const pressHandler = () => {
    hideNotification();

    if (!data.chatId) {
      return;
    }

    router.push(RouteBuilder.chat(data.chatId));
  };

  return (
    <TouchableOpacity style={{ width: '80%' }} onPress={pressHandler}>
      <View
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
    </TouchableOpacity>
  );
};
