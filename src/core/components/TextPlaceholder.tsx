import { FC, useEffect, useState } from 'react';
import { ScrollViewProps, View } from 'tamagui';

export type TextPlaceholderProps = Pick<
  ScrollViewProps,
  'flex' | 'w' | 'h' | 'bg'
>;

const FLASHING_INTERVAL_IN_MS = 400;

const MINIMUM_OPACITY = 0.5;

export const TextPlaceholder: FC<TextPlaceholderProps> = (props) => {
  const { h = 20, w = 10, bg = '#CDCDCD' } = props;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cleanup = setTimeout(() => {
      setIsVisible((prevState) => !prevState);
    }, FLASHING_INTERVAL_IN_MS);

    return () => clearTimeout(cleanup);
  }, [isVisible]);

  return (
    <View
      animation="medium"
      enterStyle={{ opacity: 0 }}
      opacity={isVisible ? 1 : MINIMUM_OPACITY}
      style={{ transition: 'all .200s' }}
      h={h}
      w={w}
      bg={bg}
    />
  );
};
