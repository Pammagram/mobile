/* eslint-disable no-magic-numbers -- temp solution */
import { Check } from '@tamagui/lucide-icons';
import { Icon } from 'features/chats/view';
import { useMe, useUsers } from 'features/user';
import { FC } from 'react';
import { Checkbox, Text, XStack, YStack } from 'tamagui';

import { useCreateGroupChat } from './_layout';

const CreateGroupScreen: FC = () => {
  const { memberIds, setMemberIds } = useCreateGroupChat();

  const { getMe } = useMe({});

  const { getUsers } = useUsers({});

  return (
    <YStack>
      <YStack marginTop={10}>
        {getUsers.data?.data
          .filter((user) => user.id !== getMe.data?.data?.id)
          .map((user, index) => {
            return (
              <XStack key={index} ai="center">
                <Checkbox
                  size="$4"
                  onCheckedChange={(isChecked) => {
                    if (!isChecked) {
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
            );
          })}
      </YStack>
    </YStack>
  );
};

export default CreateGroupScreen;
