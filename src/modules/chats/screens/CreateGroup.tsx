import { Check } from '@tamagui/lucide-icons';
import { FC } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Checkbox, Text, View, XStack, YStack } from 'tamagui';

import { UserDto } from '$core/graphql';
import { useCreateGroupChat } from '$modules/chats/providers';
import { Icon } from '$modules/chats/view';
import { useMe, useUsers } from '$modules/user';

type ContactProps = {
  user: UserDto;
};

const Contact: FC<ContactProps> = ({ user }) => {
  const { memberIds, setMemberIds } = useCreateGroupChat();

  return (
    <TouchableOpacity>
      <XStack ai="center">
        <Checkbox
          size="$4"
          onCheckedChange={(checked) => {
            if (!checked) {
              setMemberIds(memberIds.filter((id) => id !== user.id));

              return;
            }

            setMemberIds([...memberIds, user.id]);
          }}
        >
          <Checkbox.Indicator>
            <Check />
          </Checkbox.Indicator>
        </Checkbox>
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
};

export const CreateGroupScreen: FC = () => {
  const { getMe } = useMe({});

  const { getUsers } = useUsers({});

  const { bottom } = useSafeAreaInsets();

  return (
    <YStack flex={1}>
      <View paddingHorizontal={10} flex={1}>
        <FlatList
          ListFooterComponent={<View height={bottom} />}
          showsVerticalScrollIndicator
          data={getUsers.data?.data.filter(
            (user) => user.id !== getMe.data?.data?.id,
          )}
          renderItem={(item) => <Contact user={item.item} />}
        />
      </View>
    </YStack>
  );
};
