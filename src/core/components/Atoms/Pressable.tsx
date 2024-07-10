import { FC, PropsWithChildren } from 'react';
// eslint-disable-next-line @cspell/spellchecker -- library implementation
import { Pressable as RnPressable, PressableProps } from 'react-native';

type Props = Pick<PressableProps, 'onPress' | 'onLongPress'>;

export const Pressable: FC<PropsWithChildren<Props>> = (props) => {
  const { children, ...restProps } = props;

  return <RnPressable {...restProps}>{children}</RnPressable>;
};
