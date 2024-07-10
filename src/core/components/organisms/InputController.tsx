import { whiteA } from '@tamagui/colors';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input as TamaguiInput, InputProps, Text, View } from 'tamagui';

type Props<Values extends FieldValues> = {
  control: Control<Values>;
  name: Path<Values>;
  errorMessage?: string;
} & InputProps;

export const InputController = <Values extends FieldValues>(
  props: Props<Values>,
): JSX.Element => {
  const { errorMessage, control, name, ...restProps } = props;

  return (
    <Controller
      render={({ field: { onChange, ...restRenderProps } }) => (
        <View gap={5}>
          <TamaguiInput
            onChangeText={onChange}
            {...restRenderProps}
            {...restProps}
          />
          {errorMessage && <Text color={whiteA.whiteA12}>{errorMessage}</Text>}
        </View>
      )}
      control={control}
      name={name}
    />
  );
};
