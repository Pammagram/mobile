import { redDark } from '@tamagui/colors';
import { Image } from 'expo-image';
import { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useLogic } from './hooks';

import { logo } from '$core/assets';

export const SignInScreen: FC = () => {
  const { scrollRef, components, screenWidth } = useLogic();
  const styles = useStyles(screenWidth);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image} />
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        scrollEnabled={false}
        horizontal
        pagingEnabled
      >
        {components.map((component, index) => (
          <View key={index} style={styles.form}>
            {component}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const useStyles = (screenWidth: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      gap: 50,
      backgroundColor: redDark.red2,

      // * We need here negative margin to shift content higher.
      marginTop: '-25%',
    },
    imageContainer: {
      alignItems: 'center',
    },
    image: {
      width: '50%',
      aspectRatio: 1,
    },
    scroll: {
      flexGrow: 0,
      flexShrink: 0,
    },
    scrollContainer: {
      height: 'auto',
    },
    form: {
      gap: 20,
      width: screenWidth,
      padding: 10,
    },
  });
};
