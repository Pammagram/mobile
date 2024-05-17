import { useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';

import { phoneVar } from '../../../phone';
import { defaultValues, EnterCodeForm, schema } from '../form';

import { useVerifySms } from '$modules/auth/graphql';

export const useLogic = () => {
  const {
    verifySms: { request, loading: isLoading },
  } = useVerifySms({ fetchPolicy: 'network-only' });

  const phoneNumber = useReactiveVar(phoneVar);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver<EnterCodeForm>(schema),
    defaultValues,
    mode: 'onChange',
  });

  const onVerifySmsHandler = handleSubmit(async (data: EnterCodeForm) => {
    const response = await request({
      input: {
        phoneNumber,
        code: data.code,
        device:
          Device.modelName ||
          Device.deviceName ||
          Device.brand ||
          Device.deviceType?.toString() ||
          'Unknown device',
      },
    });

    if (response?.data.username) {
      router.replace('/(app)/chats');
    } else {
      router.replace('/update-me');
    }
  });

  return {
    errors,
    control,
    onVerifySmsHandler,
    isLoading,
    isValid,
  };
};
