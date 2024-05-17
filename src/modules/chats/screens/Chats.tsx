import { FC, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View } from 'tamagui';

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
      <View>
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
              lastMessage={chat.lastMessage}
            />
          )}
          renderHiddenItem={() => <View />}
          // leftOpenValue={150}
          rightOpenValue={-150}
        />
      </View>
    </SafeAreaView>
  );
};
