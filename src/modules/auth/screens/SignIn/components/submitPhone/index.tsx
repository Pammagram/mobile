import { blue, whiteA } from '@tamagui/colors';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Text, View } from 'tamagui';

import { DEFAULT_CODE } from './configs';
import { useLogic } from './hooks';

type Props = {
  afterSubmit?: () => void;
};

export const SubmitPhone: FC<Props> = (props) => {
  const { afterSubmit } = props;

  const { control, errors, isLoading, onSendSmsHandler, isValid } = useLogic({
    afterSubmit,
  });

  const errorMessage = errors.phone?.message;

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, ...restProps } }) => (
          <View gap={5}>
            <PhoneInput
              defaultCode={DEFAULT_CODE}
              onChangeFormattedText={onChange}
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textContainer}
              textInputStyle={styles.lightText}
              codeTextStyle={styles.lightText}
              textInputProps={{
                placeholderTextColor: whiteA.whiteA8,
                selectionColor: blue.blue10,
              }}
              withDarkTheme
              autoFocus
              disableArrowIcon
              {...restProps}
            />

            {errorMessage && (
              <Text color={whiteA.whiteA12}>{errorMessage}</Text>
            )}
          </View>
        )}
        name="phone"
      />

      <Button
        onPress={onSendSmsHandler}
        backgroundColor="$red8"
        isLoading={isLoading}
        isDisabled={!isValid}
      >
        <Text color={whiteA.whiteA12}>Continue</Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  phoneContainer: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#151515',
    borderColor: '#323232',
    borderWidth: 1,
  },
  textContainer: {
    borderRadius: 8,
    backgroundColor: '#151515',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  lightText: {
    color: whiteA.whiteA12,
  },
});
