import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { Text, YGroup } from 'tamagui';

import { useLogout, useMe } from '$features';
import { Button } from '$shared';

export const SettingsScreen: FC = () => {
  const { getMe } = useMe({});

  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout.request({});

    router.navigate('/(auth)/sign-in');

    // TODO clear user variable here and unsubscribe from events
  };

  return (
    <SafeAreaView>
      <YGroup>
        <Text>This is main screen!</Text>
        <Text>Phone number: {getMe.data?.data?.phoneNumber}</Text>
        <Text>Username: {getMe.data?.data?.username}</Text>
        <Button onPress={handleLogout}>Logout</Button>
      </YGroup>
    </SafeAreaView>
  );
};
