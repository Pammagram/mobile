import { FC } from 'react';
import { View } from 'tamagui';

import { useLogic } from './hooks';

import { Button, InputController } from '$shared';

export const UpdateMe: FC = () => {
  const { control, errors, isLoading, isValid, onUpdateMeHandler } = useLogic();

  const errorMessage = errors.username?.message;

  return (
    <View gap={20}>
      <InputController
        control={control}
        errorMessage={errorMessage}
        placeholder="Enter your user name..."
        name="username"
      />

      <Button
        onPress={onUpdateMeHandler}
        backgroundColor="$red8"
        isLoading={isLoading}
        isDisabled={!isValid}
      >
        Continue
      </Button>
    </View>
  );
};
