import { useLocalSearchParams, useNavigation } from 'expo-router';
import { FC, useEffect } from 'react';
import { Text, View } from 'tamagui';

import { useChat } from '$features';

export const ChatScreen: FC = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const navigation = useNavigation();

  const {
    getChat: { data },
  } = useChat({
    variables: {
      input: {
        id: Number(chatId),
      },
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: data?.data.title,
    });
  }, [navigation]);

  return (
    <View>
      <Text marginTop={10}>This is chat {data?.data.title}</Text>
    </View>
  );
};
