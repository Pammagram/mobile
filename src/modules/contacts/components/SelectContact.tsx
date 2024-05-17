import { Check } from '@tamagui/lucide-icons';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Checkbox, Text, XStack, YStack } from 'tamagui';

import { UserDto } from '$core/graphql';
import { useCreateGroupChat } from '$modules/chats/providers';
import { Icon } from '$modules/chats/view';

type Props = {
  user: Pick<UserDto, 'id' | 'username'>;
};

export const SelectContact: FC<Props> = ({ user }) => {
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
