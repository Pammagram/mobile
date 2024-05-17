import { FC, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Text, View, XGroup } from 'tamagui';

import { ChatCard } from '../components/ChatCard';
import { ChatOptionsModal } from '../components/ChatOptionsModal';
import { useMyChats } from '../graphql';

export const ChatsScreen: FC = () => {
  const { getMyChats } = useMyChats({
    variables: {
      input: {},
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const [selectedChatId, setSelectedChatId] = useState<number>();

  const onChatCardLongPress = (chatId: number) => {
    setSelectedChatId(chatId);
    setIsOpen(true);
  };

  return (
    <SafeAreaView style={{ display: 'flex', flexDirection: 'column' }}>
      <View marginHorizontal={5} h="100%">
        <ChatOptionsModal
          chatId={selectedChatId}
          isOpen={isOpen}
          onOpenChange={(newStatus) => setIsOpen(newStatus)}
          onCancel={() => setIsOpen(false)}
        />
        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={getMyChats.data?.data}
          renderItem={({ item: chat }) => (
            <ChatCard
              onLongPress={() => onChatCardLongPress(chat.id)}
              chat={chat}
            />
          )}
          renderHiddenItem={(_data, _rowMap) => (
            <XGroup jc="space-between">
              <View bg="red">
                <Text>Left</Text>
              </View>
              <View bg="red">
                <Text>Right</Text>
              </View>
            </XGroup>
          )}
          leftOpenValue={150}
          rightOpenValue={-150}
        />
      </View>
    </SafeAreaView>
  );
};
