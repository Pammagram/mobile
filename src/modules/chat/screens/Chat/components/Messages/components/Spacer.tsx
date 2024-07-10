import { FC, useCallback, useEffect, useRef } from 'react';
import { Animated, Keyboard } from 'react-native';

export const Spacer: FC = () => {
  const fadeAnimRef = useRef(new Animated.Value(0));
  const fadeAnim = fadeAnimRef.current;

  const decreaseHeight = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  const increaseHeight = useCallback(
    (keyboardHeight: number) => {
      Animated.timing(fadeAnim, {
        toValue: keyboardHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
    },
    [fadeAnim],
  );

  useEffect(() => {
    const cleanup = Keyboard.addListener('keyboardWillShow', (event) => {
      const {
        endCoordinates: { height },
      } = event;

      increaseHeight(height);
    });

    return () => {
      cleanup.remove();
    };
  }, [increaseHeight]);

  useEffect(() => {
    const cleanup = Keyboard.addListener('keyboardWillHide', decreaseHeight);

    return () => {
      cleanup.remove();
    };
  }, [decreaseHeight]);

  return (
    <Animated.View
      style={{
        height: fadeAnim,
      }}
    />
  );
};
