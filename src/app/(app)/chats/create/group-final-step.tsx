import { Camera, XCircle } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { Icon } from 'features/chats/view';
import { useMe, useUsers } from 'features/user';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input, Text, View, XStack, YStack } from 'tamagui';

import { useCreateGroupChat } from './_layout';

const CreateGroupScreen: FC = () => {
  // TODO custom hook
  const { getMe } = useMe({});

  const { getUsers } = useUsers({});

  const { memberIds, title, setTitle } = useCreateGroupChat();

  const chosenUsers = getUsers.data!.data.filter(
    (user) => memberIds.includes(user.id) && user.id !== getMe.data?.data?.id,
  );

  return (
    <YStack marginHorizontal={10} marginVertical={10}>
      <XStack br={15} bg={Colors.TERNARY_BLUE} width="100%" p={10} gap={10}>
        <View br={100} bg={Colors.TERNARY_RED} p={20}>
          <Camera />
        </View>
        <XStack flex={1} ai="center" gap={5}>
          <Input
            onChangeText={(text) => setTitle(text)}
            value={title}
            flex={1}
            placeholder="Group title"
          />
          <TouchableOpacity onPress={() => setTitle('')}>
            <XCircle />
          </TouchableOpacity>
        </XStack>
      </XStack>
      <YStack marginTop={10}>
        {chosenUsers.map((user, index) => {
          return (
            <XStack key={index} ai="center">
              <XStack gap={10} padding={10}>
                <Icon />
                <YStack>
                  <Text>{user.username}</Text>
                  <Text>Last - 30 minutes ago</Text>
                </YStack>
              </XStack>
            </XStack>
          );
        })}
      </YStack>
    </YStack>
  );
};

export default CreateGroupScreen;
