import { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { Text, YGroup } from 'tamagui';

import { useChats, useCurrentUser, useLogout } from '$features';
import { Button, StrictType } from '$shared';

export const MainScreen: FC = () => {
  const { user } = useCurrentUser<StrictType.STRICT>('cache-only');

  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout.request();
  };

  const { getChats } = useChats({
    variables: {
      input: {},
    },
  });

  return (
    <SafeAreaView>
      <YGroup>
        <Text>This is main screen!</Text>
        <Text>Phone number: {user.phoneNumber}</Text>
        <Text>Username: {user.username}</Text>
        <Button onPress={handleLogout}>Logout</Button>
        {getChats.data?.data.map((chat) => (
          <>
            <Text>{chat.title}</Text>
            <Text>{chat.members.length}</Text>
          </>
        ))}
      </YGroup>
    </SafeAreaView>
  );
};
