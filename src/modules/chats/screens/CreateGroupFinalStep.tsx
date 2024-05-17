import { Camera, XCircle } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { FC } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, Text, View, XStack, YStack } from 'tamagui';

import { useCreateGroupChat } from '$modules/chats/providers';
import { Icon } from '$modules/chats/view';
import { useContacts } from '$modules/contacts/hooks/useContacts';

export const CreateGroupFinalStepScreen: FC = () => {
  // TODO custom hook
  const { contacts } = useContacts();

  const { memberIds, title, setTitle } = useCreateGroupChat();

  const { bottom } = useSafeAreaInsets();

  const chosenUsers = contacts.filter((contact) =>
    memberIds.includes(contact.id),
  );

  return (
    <YStack marginHorizontal={10} marginVertical={10} flex={1}>
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
      <View paddingHorizontal={10} flex={1}>
        <FlatList
          ListFooterComponent={<View height={bottom} />}
          showsVerticalScrollIndicator
          data={chosenUsers}
          renderItem={(props) => {
            const { index, item: user } = props;

            return (
              <TouchableOpacity>
                <XStack key={index} ai="center">
                  <XStack gap={10} padding={10}>
                    <Icon />
                    <YStack>
                      <Text>{user.username}</Text>
                      <Text>Last - 30 minutes ago</Text>
                    </YStack>
                  </XStack>
                </XStack>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </YStack>
  );
};
