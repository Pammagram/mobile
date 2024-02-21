import { ChevronLeft, UserCircle } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { FC, useCallback, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, XGroup, YGroup, YStack } from 'tamagui';
import { create } from 'zustand';

import { useChat } from '$features';

type ChatHeaderParams = {
  // headerHeight: number;
  inputHeight: number;
  messagesContainerHeight: number;

  // setHeaderHeight: (height: number) => void;
  setInputHeight: (height: number) => void;
  setMessagesContainerHeight: (height: number) => void;
};

export const useChatLayout = create<ChatHeaderParams>((set) => ({
  inputHeight: 0,
  setInputHeight: (inputHeight: number) => set({ inputHeight }),

  messagesContainerHeight: 0,
  setMessagesContainerHeight: (messagesContainerHeight: number) =>
    set({ messagesContainerHeight }),
}));

const ChatTitle = () => {
  const { getChat } = useLogic();

  const chatName = getChat.data?.data.title;

  return (
    <YGroup alignItems="center" flex={1}>
      <Text>{chatName}r</Text>
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

const useLogic = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const { getChat } = useChat({
    variables: {
      input: {
        id: Number(chatId),
      },
    },
  });

  useEffect(() => {
    if (!getChat.loading && !getChat.data?.data) {
      console.error('Not found chat');
      router.push('/(app)/contacts');
    }
  }, [getChat.data]);

  return {
    getChat,
  };
};
