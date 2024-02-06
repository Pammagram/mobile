import { useLocalSearchParams } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'tamagui';

import { useChat } from '$features';

export const ChatScreen: FC = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const { getChat } = useChat({
    variables: {
      input: {
        id: Number(chatId),
      },
    },
  });

  return (
    <SafeAreaView>
      <View>
        <Text>This is chat {getChat.data?.data.title}</Text>
      </View>
    </SafeAreaView>
  );
};
