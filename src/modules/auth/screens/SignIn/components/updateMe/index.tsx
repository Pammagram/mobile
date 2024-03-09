import { FC } from 'react';
import { View } from 'tamagui';

import { useLogic } from './hooks';

import { Button, InputController } from '$core/components';

export const UpdateMe: FC = () => {
  const { control, errors, isLoading, isValid, onUpdateMeHandler } = useLogic();

  return (
    <View gap={20}>
      <InputController
        control={control}
        errorMessage={errors.username?.message}
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
