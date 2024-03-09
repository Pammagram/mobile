import { ChevronLeft, UserCircle } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { router, Stack } from 'expo-router';
import { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, XGroup, YGroup, YStack } from 'tamagui';

import { useLogic } from './useLogic';

import { ChatType } from '$core/graphql';
import { useMe } from '$modules/user';

const ChatTitle = () => {
  const { getChat } = useLogic();

  const { getMe } = useMe({});

  const chat = getChat.data?.data;

  const chatName =
    chat?.type === ChatType.Private
      ? chat.members.find((member) => member.id !== getMe.data?.data?.id)
          ?.username
      : chat?.title;

  return (
    <YGroup alignItems="center" flex={1}>
      <Text>{chatName}</Text>
    </YGroup>
  );
};

const Header: FC = () => {
  const { top } = useSafeAreaInsets();

  const handlePopToTop = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <YStack paddingTop={top} backgroundColor={Colors.PRIMARY_RED}>
      <XGroup
        paddingTop={top}
        justifyContent="space-between"
        alignItems="center"
        marginHorizontal={5}
        paddingVertical={5}
      >
        {/* Fixed height for correct element centering */}
        <TouchableOpacity onPress={handlePopToTop}>
          <XGroup alignItems="center" width={50}>
            <ChevronLeft color="black" />
            <Text>Back</Text>
          </XGroup>
        </TouchableOpacity>
        <ChatTitle />
        <YGroup alignItems="center" width={50}>
          <UserCircle color="black" />
        </YGroup>
      </XGroup>
    </YStack>
  );
};

export const ChatLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: Header,
      }}
    >
      <Stack.Screen
        name="[chatId]"
        options={{
          freezeOnBlur: false,
        }}
      />
    </Stack>
  );
};
