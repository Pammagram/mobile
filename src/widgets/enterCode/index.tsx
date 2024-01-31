import { FC } from 'react';
import { Text } from 'tamagui';

import { useLogic } from './hooks';

import { Button, InputController } from '$shared';

export const EnterCode: FC = () => {
  const { control, errors, isLoading, isValid, onVerifySmsHandler } =
    useLogic();

  const errorMessage = errors.code?.message;

  return (
    <>
      <InputController
        control={control}
        name="code"
        errorMessage={errorMessage}
        placeholder="Enter code"
        size="$5"
      />

      <Button
        isLoading={isLoading}
        isDisabled={!isValid}
        onPress={onVerifySmsHandler}
        backgroundColor="$red8"
      >
        <Text color="#fff">Submit</Text>
      </Button>
    </>
  );
};
