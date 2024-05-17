import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';

import { UserDto } from '$core/graphql';
import { Icon } from '$modules/chats/view';

type Props = {
  user: Pick<UserDto, 'id' | 'username'>;
};

export const Contact: FC<Props> = ({ user }) => {
  return (
    <TouchableOpacity>
      <XStack ai="center">
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
