import { ChevronLeft, UserCircle } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { router, Stack } from 'expo-router';
import { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, XGroup, YGroup, YStack } from 'tamagui';
import { create } from 'zustand';

type ChatHeaderParams = {
  // headerHeight: number;
  inputHeight: number;
  messagesContainerHeight: number;

  // setHeaderHeight: (height: number) => void;
  setInputHeight: (height: number) => void;
  setMessagesContainerHeight: (height: number) => void;
};

export const useChatLayout = create<ChatHeaderParams>((set) => ({
  // headerHeight: 0,
  // setHeaderHeight: (headerHeight: number) => set({ headerHeight }),

  inputHeight: 0,
  setInputHeight: (inputHeight: number) => set({ inputHeight }),

  messagesContainerHeight: 0,
  setMessagesContainerHeight: (messagesContainerHeight: number) =>
    set({ messagesContainerHeight }),
}));

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

        <YGroup alignItems="center" width={50}>
          <Text>User</Text>
        </YGroup>

        <YGroup alignItems="center" width={50}>
          <UserCircle color="black" />
        </YGroup>
      </XGroup>
    </YStack>
  );
};

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        header: Header,
        freezeOnBlur: true,
      }}
    >
      <Stack.Screen
        name="[chatId]"
        options={{
          freezeOnBlur: true,
        }}
      />
    </Stack>
  );
};

export default Layout;
