import { Bell, Trash, X } from '@tamagui/lucide-icons';
import { FC } from 'react';
import { AlertDialog, Button, YStack } from 'tamagui';

import { useRemoveChat } from '../graphql';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onOpenChange: (newStatus: boolean) => void;
  chatId?: number;
};

export const ChatOptionsModal: FC<Props> = (props) => {
  const { isOpen, onOpenChange, onCancel, chatId } = props;

  const { removeChat } = useRemoveChat();

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
              <AlertDialog.Action
                asChild
                width="100%"
                onPress={() => {
                  if (!chatId) {
                    console.error('No chat id selected!');

                    return;
                  }

                  void removeChat.request({
                    input: {
                      chatId,
                    },
                  });
                }}
              >
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
