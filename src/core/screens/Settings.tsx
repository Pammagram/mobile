import notifee, { AndroidImportance } from '@notifee/react-native';
import { Smartphone } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import moment from 'moment';
import { FC } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, XStack, YGroup, YStack } from 'tamagui';

import { Button } from '$core/components';
import { useRequestNotificationPermission } from '$core/notifications/hooks/useRequestNotificationPermission';
import { useMe, useMySessions, useRemoveSession } from '$modules';
import { useLogout } from '$modules/auth/graphql';

export const SettingsScreen: FC = () => {
  const { getMe } = useMe({});
  const { getMySessions } = useMySessions();
  const { removeSession } = useRemoveSession();
  const { requestNotificationPermission } = useRequestNotificationPermission();
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout.request({});

    router.replace('/(auth)/sign-in');

    // TODO clear user variable here and unsubscribe from events
  };

  // TODO to hook

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
        <Button onPress={requestNotificationPermission}>
          Request Notification Permission
        </Button>
        <Button
          onPress={async () => {
            // Request permissions (required for iOS)

            // Create a channel (required for Android)
            const channelId = await notifee.createChannel({
              id: 'default',
              name: 'Default Channel',
            });

            // Display a notification
            const notificationId = await notifee.displayNotification({
              title: 'Notification Title',
              body: 'Main body content of the notification',
              android: {
                channelId,
                importance: AndroidImportance.HIGH,
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                  id: 'post',
                },
                sound: '',
                actions: [
                  {
                    title: 'Open',
                    icon: 'https://my-cdn.com/icons/open-chat.png',
                    pressAction: {
                      id: 'open-chat',
                      launchActivity: 'default',
                    },
                    input: true,
                  },
                ],
              },
              ios: {
                categoryId: 'post',
              },
            });
          }}
        >
          Send Notification
        </Button>
        <Button onPress={handleLogout}>Logout</Button>
      </YGroup>
    </SafeAreaView>
  );
};
