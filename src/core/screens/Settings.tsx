import { Smartphone } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import moment from 'moment';
import { FC } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, XStack, YGroup, YStack } from 'tamagui';

import { Button } from '$core/components';
import { useMe, useMySessions, useRemoveSession } from '$modules';
import { useLogout } from '$modules/auth/graphql';

export const SettingsScreen: FC = () => {
  const { getMe } = useMe({});

  const { getMySessions } = useMySessions();
  const { removeSession } = useRemoveSession();

  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout.request({});

    router.replace('/(auth)/sign-in');

    // TODO clear user variable here and unsubscribe from events
  };

  return (
    <SafeAreaView>
      <YGroup>
        <Text>This is main screen!</Text>
        <Text>Phone number: {getMe.data?.data?.phoneNumber}</Text>
        <Text>Username: {getMe.data?.data?.username}</Text>
        <ScrollView h={300}>
          {getMySessions.data?.data.map((session) => {
            const { device } = session;

            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Remove session', undefined, [
                    {
                      text: 'Back',
                    },
                    {
                      text: 'Remove',
                      onPress: async () => {
                        try {
                          await removeSession.request({
                            input: {
                              id: session.id,
                            },
                          });

                          await getMySessions.refetch();
                        } catch (error) {
                          console.error(error);
                        }
                      },
                      style: 'destructive',
                    },
                  ]);
                }}
                key={session.id}
              >
                <XStack
                  jc="flex-start"
                  borderColor="red"
                  borderWidth={1}
                  p={5}
                  ai="center"
                  gap={5}
                >
                  <Smartphone />
                  <YStack>
                    <Text fontSize={14}>{device}</Text>
                    <Text fontSize={12}>
                      {moment(session.lastVisitInMs).format('ddd, hh:mm')}
                    </Text>
                  </YStack>
                </XStack>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Button onPress={handleLogout}>Logout</Button>
      </YGroup>
    </SafeAreaView>
  );
};
