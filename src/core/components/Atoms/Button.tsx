import { whiteA } from '@tamagui/colors';
import { FC, ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button as TamaguiButton, ButtonProps } from 'tamagui';

type Props = Omit<ButtonProps, 'children'> & {
  children: ReactNode | ReactNode[];
  isDisabled?: boolean;
  isLoading?: boolean;
};

export const Button: FC<Props> = (props) => {
  const { children, isLoading, isDisabled, ...restProps } = props;

  const isButtonDisabled = isLoading || isDisabled;

  return (
    <TamaguiButton disabled={isButtonDisabled} {...restProps}>
      {isLoading && <ActivityIndicator size="small" color={whiteA.whiteA12} />}

      {!isLoading && children}
    </TamaguiButton>
  );
};
