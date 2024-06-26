import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { phoneVar } from '../../../phone';
import { defaultValues, schema, SubmitPhoneForm } from '../form';

import { useSendSms } from '$modules/auth/graphql';

type Params = {
  afterSubmit?: () => void;
};

export const useLogic = (params: Params) => {
  const { afterSubmit } = params;

  const {
    sendSms: { request, loading: isLoading },
  } = useSendSms();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver<SubmitPhoneForm>(schema),
    defaultValues,
    mode: 'onChange',
  });

  const onSendSmsHandler = handleSubmit(async (data: SubmitPhoneForm) => {
    phoneVar(data.phone);
    await request({ input: { phoneNumber: data.phone } });
    afterSubmit?.();
  });

  return {
    errors,
    control,
    onSendSmsHandler,
    isLoading,
    isValid,
  };
};
