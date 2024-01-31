import { useEffect } from 'react';

import { useMe } from '../graphql';

import { userVar } from '$entities';
import { UserDto } from '$shared';

type ReturnType = {
  isLoading: boolean;
  user: UserDto | null;
};

export const useCurrentUser = (): ReturnType => {
  const {
    getMe: { data, loading: isLoading },
  } = useMe({
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    userVar(data ?? null);
  }, [data?.id]);

  return {
    user: data ?? null,
    isLoading,
  };
};
