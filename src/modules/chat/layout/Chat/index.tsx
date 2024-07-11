import { Stack } from 'expo-router';

import { Header } from './components/Header';

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
