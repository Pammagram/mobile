import { MessageSquarePlus } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

export const CreateChatButton: FC = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push('/(app)/chats/create')}
      style={{ padding: 10 }}
    >
      <MessageSquarePlus color="black" />
    </TouchableOpacity>
  );
};
