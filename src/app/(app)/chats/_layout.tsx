import { Stack } from 'expo-router';
import { FC } from 'react';

const Layout: FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
          freezeOnBlur: true,
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'formSheet',
          headerShown: false,
          freezeOnBlur: true,
        }}
      />
    </Stack>
  );
};

export default Layout;
