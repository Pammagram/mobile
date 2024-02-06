import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Text } from 'tamagui';

import { useChats } from '$features';

export const ChatsScreen: FC = () => {
  const { getChats } = useChats({
    variables: {
      input: {},
    },
  });

  return (
    <SafeAreaView>
      <View>
        {getChats.data?.data.map((chat) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: `(chats)/${chat.id}`,
              });
            }}
            key={chat.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Text>{chat.title}</Text>
            <Text>{chat.members.length}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};
