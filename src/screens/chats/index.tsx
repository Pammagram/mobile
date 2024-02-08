import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Text } from 'tamagui';

import { useChats } from '$features';

export const ChatsScreen: FC = () => {
  // TODO subscription for new chats
  const { getChats } = useChats({
    variables: {
      input: {},
    },
  });

  return (
    <SafeAreaView>
      <View style={{ marginHorizontal: 5 }}>
        {getChats.data?.data.map((chat) => (
          <TouchableOpacity
            onPress={() => {
              router.push(`chats/${chat.id}`);
            }}
            key={chat.id}
            style={{
              height: 80,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#d6d6cd',
            }}
          >
            <Text fontSize={20}>{chat.title}</Text>
            <Text>{chat.id}</Text>
            <Text>Members: {chat.members.length}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};
