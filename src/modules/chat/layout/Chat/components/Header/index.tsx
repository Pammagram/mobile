import { ChevronLeft, UserCircle } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { router } from 'expo-router';
import { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, XGroup, YGroup, YStack } from 'tamagui';

import { ChatTitle } from '../ChatTitle';

export const Header: FC = () => {
  const { top } = useSafeAreaInsets();

  const handlePopToTop = useCallback(() => {
    router.back();
  }, []);

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
