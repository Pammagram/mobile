import { ChevronLeft, UserCircle } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, XGroup, YGroup } from 'tamagui';

const Header = () => {
  const { top } = useSafeAreaInsets();

  const handlePopToTop = () => {
    router.back();
  };

  return (
    <View paddingTop={top} backgroundColor={Colors.PRIMARY_RED}>
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
    </View>
  );
};

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        header: Header,
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
