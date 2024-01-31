import { useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';

import { defaultValues, EnterCodeForm, schema } from '../form';

import { phoneVar, userVar } from '$entities';
import { useVerifySms } from '$features';

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
    const response = await request({ input: { phoneNumber, code: data.code } });

    userVar(response?.data ?? null);

    const isUserWithoutUserName = response?.data && !response.data.username;

    if (isUserWithoutUserName) {
      router.push('/update-me');
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
