import { StackActions } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, XGroup, YGroup } from 'tamagui';

const Header = () => {
  const navigation = useNavigation();

  const { top } = useSafeAreaInsets();

  const handlePopToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <XGroup marginTop={top} justifyContent="space-between" alignItems="center">
      <YGroup>
        <Text onPress={handlePopToTop}>Back</Text>
      </YGroup>
      <YGroup alignItems="center">
        <Text>User</Text>
        <Text>Online - 6 hours ago</Text>
      </YGroup>
      <Text>User icon</Text>
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
