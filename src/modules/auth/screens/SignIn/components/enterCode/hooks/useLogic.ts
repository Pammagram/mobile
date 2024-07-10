import { useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';

import { phoneVar } from '../../../phone';
import { defaultValues, EnterCodeForm, schema } from '../form';

import { getDeviceName } from '$core/utils/getDeviceName';
import { useVerifySms } from '$modules/auth/graphql';
import { getMessagingToken } from '$modules/notification/utils/getMessagingToken';

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
    const messagingToken = await getMessagingToken();

    const response = await request({
      input: {
        phoneNumber,
        code: data.code,
        device: getDeviceName(),
        messagingToken,
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
