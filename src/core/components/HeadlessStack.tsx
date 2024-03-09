import { Stack } from 'expo-router';
import { FC } from 'react';

export const HeadlessStack: FC = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};
