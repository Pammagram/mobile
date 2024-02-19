import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { Text, YGroup } from 'tamagui';

import { useCurrentUser, useLogout } from '$features';
import { Button, StrictType } from '$shared';

export const MainScreen: FC = () => {
  const { user } = useCurrentUser<StrictType.STRICT>('cache-only');

  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout.request({});

    router.navigate('/');

    // TODO clear user variable here and unsubscribe from events
  };

  return (
    <SafeAreaView>
      <YGroup>
        <Text>This is main screen!</Text>
        <Text>Phone number: {user.phoneNumber}</Text>
        <Text>Username: {user.username}</Text>
        <Button onPress={handleLogout}>Logout</Button>
      </YGroup>
    </SafeAreaView>
  );
};
