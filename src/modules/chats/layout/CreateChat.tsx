import { HeaderButtonProps } from '@react-navigation/native-stack/src/types';
import { router, Stack } from 'expo-router';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'tamagui';

import { useCreateChat } from '$features';
import {
  CreateChatProvider,
  useCreateGroupChat,
} from '$modules/chats/providers';

const CreateGroupChatCreateButton: FC<HeaderButtonProps> = (props) => {
  const { tintColor } = props;
  const { title, memberIds, chatType } = useCreateGroupChat();
  const { createChat } = useCreateChat({});

  return (
    <TouchableOpacity
      disabled={!title?.length}
      onPress={async () => {
        await createChat.request({
          input: {
            memberIds,
            title,
            type: chatType,
          },
        });
        router.navigate('/(app)/chats');
      }}
    >
      <Text color={!title?.length ? undefined : tintColor}>Create</Text>
    </TouchableOpacity>
  );
};

const CreateGroupChatNextButton: FC<HeaderButtonProps> = (props) => {
  const { tintColor } = props;

  return (
    <TouchableOpacity
      onPress={() => router.push('/(app)/chats/create/group-final-step')}
    >
      <Text col={tintColor}>Next</Text>
    </TouchableOpacity>
  );
};

export const CreateChatLayout: FC = () => {
  return (
    <CreateChatProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="group"
          options={{
            headerRight: CreateGroupChatNextButton,
          }}
        />
        <Stack.Screen
          name="group-final-step"
          options={{
            headerRight: CreateGroupChatCreateButton,
          }}
        />
      </Stack>
    </CreateChatProvider>
  );
};
