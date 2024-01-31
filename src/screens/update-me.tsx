import { redDark } from '@tamagui/colors';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { H2 } from 'tamagui';

import { UpdateMe } from '$widgets';

export const UpdateMeScreen = () => {
  return (
    <>
      <StatusBar style="light" />

      <View style={styles.container}>
        <H2 color="#fff">How we can call you?</H2>
        <UpdateMe />
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 30,
    backgroundColor: redDark.red2,
    padding: 10,
  },
});
