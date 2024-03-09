import { Users } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { router } from 'expo-router';
import { useCreateChat, useMyChats } from '$modules/chats/graphql/documents';
import { Icon } from '$modules/chats/view';
import { useMe, useUsers } from 'features/user';
import { FC } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text, View, XStack, YStack } from 'tamagui';

import { ChatType } from '$shared';

export const CreateChatScreen: FC = () => {
  const { getMe } = useMe({});

  const { getUsers } = useUsers({});

  const { getMyChats } = useMyChats({
    variables: {
      input: {},
    },
  });

  const { bottom } = useSafeAreaInsets();

  const { createChat } = useCreateChat({});

  return (
    <YStack>
      <YStack marginTop={10} backgroundColor={Colors.WHITE_SECONDARY}>
        <Button
          jc="flex-start"
          ai="center"
          onPress={() => {
            router.push('/(app)/chats/create/group');
          }}
        >
          <Users />
          <Text>Create group chat</Text>
        </Button>
      </YStack>
      <YStack>
        <FlatList
          ListFooterComponent={<View height={bottom} />}
          showsVerticalScrollIndicator
          data={getUsers.data?.data.filter(
            (user) => user.id !== getMe.data?.data?.id,
          )}
          renderItem={(props) => {
            const { index, item: user } = props;

            return (
              <TouchableOpacity
                onPress={async () => {
                  let privateChat = getMyChats.data?.data.find(
                    (chat) =>
                      chat.type === ChatType.Private &&
                      chat.members.find((member) => member.id === user.id),
                  );

                  if (!privateChat) {
                    const response = await createChat.request({
                      input: {
                        memberIds: [getMe.data!.data!.id, user.id], // TODO avoid this
                        type: ChatType.Private,
                        title: 'redundant',
                      },
                    });

                    privateChat = response?.data;
                  }

                  router.back();
                  router.navigate(`chats/${privateChat?.id}`);
                }}
                key={index}
              >
                <XStack gap={10} padding={10}>
                  <Icon />
                  <YStack>
                    <Text>{user.username}</Text>
                    <Text>Last - 30 minutes ago</Text>
                  </YStack>
                </XStack>
              </TouchableOpacity>
            );
          }}
        />
      </YStack>
    </YStack>
  );
};
