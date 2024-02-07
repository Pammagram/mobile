import { StackActions } from '@react-navigation/native';
import { ChevronLeft, UserCircle } from '@tamagui/lucide-icons';
import { Stack, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, XGroup, YGroup } from 'tamagui';

const Header = () => {
  const navigation = useNavigation();

  const { top } = useSafeAreaInsets();

  const handlePopToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <XGroup
      marginTop={top}
      justifyContent="space-between"
      alignItems="center"
      marginHorizontal={5}
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
  );
};

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        header: Header,
      }}
    />
  );
};

export default Layout;
