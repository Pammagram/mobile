import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';

import { defaultValues, schema, UpdateMeForm } from '../form';

import { userVar } from '$entities';
import { useUpdateMe } from '$features';

export const useLogic = () => {
  const {
    updateMe: { request, loading: isLoading },
  } = useUpdateMe({ fetchPolicy: 'network-only' });

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver<UpdateMeForm>(schema),
    defaultValues,
    mode: 'onChange',
  });

  const onUpdateMeHandler = handleSubmit(async (data: UpdateMeForm) => {
    const response = await request({ input: { username: data.username } });

    userVar(response?.data ?? null);
    router.push('/');
  });

  return {
    errors,
    control,
    onUpdateMeHandler,
    isLoading,
    isValid,
  };
};
