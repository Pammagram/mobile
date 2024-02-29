/* eslint-disable no-magic-numbers -- temp solution */
import { router } from 'expo-router';
import { useCreateChat, useMyChats } from 'features/chats/graphql';
import { Icon } from 'features/chats/view';
import { useMe, useUsers } from 'features/user';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';

import { ChatType } from '$shared';

const CreateChat: FC = () => {
  // TODO custom hook
  const { getMe } = useMe({});

  const { getUsers } = useUsers({});

  const { getMyChats } = useMyChats({
    variables: {
      input: {},
    },
  });

  const { createChat } = useCreateChat({});

  return (
    <YStack>
      <YStack marginTop={10}>
        <TouchableOpacity
          onPress={() => {
            router.push('/(app)/chats/create/group');
          }}
        >
          <XStack jc="center">
            <Text>Create group chat</Text>
          </XStack>
        </TouchableOpacity>
        {getUsers.data?.data
          .filter((user) => user.id !== getMe.data?.data?.id)
          .map((user, index) => {
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
          })}
      </YStack>
    </YStack>
  );
};

export default CreateChat;
