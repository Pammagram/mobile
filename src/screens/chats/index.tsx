import { Bell, Trash, X } from '@tamagui/lucide-icons';
import { Href, router } from 'expo-router';
import { FC, useState } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AlertDialog, Button, Text, XGroup, YStack } from 'tamagui';

import { useChats } from '$features';

type ModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onOpenChange: (newStatus: boolean) => void;
};

const Modal: FC<ModalProps> = (props) => {
  const { isOpen, onOpenChange, onCancel } = props;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <YStack space="$3" justifyContent="center">
              <AlertDialog.Action asChild width="100%">
                <Button theme="active">
                  <Bell />
                  Mute
                </Button>
              </AlertDialog.Action>
              <AlertDialog.Action asChild width="100%">
                <Button theme="active">
                  <Trash /> Delete
                </Button>
              </AlertDialog.Action>
              <AlertDialog.Action onPress={onCancel} asChild width="100%">
                <Button theme="active">
                  <X /> Cancel
                </Button>
              </AlertDialog.Action>
            </YStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

export const ChatsScreen: FC = () => {
  // TODO subscription for new chats
  const { getChats } = useChats({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      input: {},
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <SafeAreaView style={{ display: 'flex', flexDirection: 'column' }}>
      <View style={{ marginHorizontal: 5, height: '100%' }}>
        <Modal
          isOpen={isOpen}
          onOpenChange={(newStatus) => setIsOpen(newStatus)}
          onCancel={() => setIsOpen(false)}
        />
        <SwipeListView
          data={getChats.data?.data}
          renderItem={({ item: chat }) => (
            <Pressable
              onPress={() => router.push(`chat/${chat.id}` as Href<string>)}
              onLongPress={() => setIsOpen(true)}
              key={chat.id}
            >
              <View
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
              </View>
            </Pressable>
          )}
          renderHiddenItem={(_data, _rowMap) => (
            <XGroup
              style={{
                justifyContent: 'space-between',
              }}
            >
              <View style={{ backgroundColor: 'red' }}>
                <Text>Left</Text>
              </View>

              <View style={{ backgroundColor: 'red' }}>
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
