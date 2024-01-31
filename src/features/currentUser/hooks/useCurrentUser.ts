import { WatchQueryFetchPolicy } from '@apollo/client';

import { useMe } from '../graphql';

import { StrictType, UserDto } from '$shared';

type ReturnType<Strict extends StrictType = StrictType.NOT_STRICT> = {
  isLoading: boolean;
  user: Strict extends StrictType.STRICT ? UserDto : UserDto | null;
};

export const useCurrentUser = <
  Strict extends StrictType = StrictType.NOT_STRICT,
>(
  fetchPolicy?: WatchQueryFetchPolicy,
): ReturnType<Strict> => {
  const {
    getMe: { data, loading: isLoading },
  } = useMe({
    fetchPolicy: fetchPolicy ?? 'network-only',
  });

  return {
    user: data ?? null,
    isLoading,
  } as ReturnType<Strict>;
};
