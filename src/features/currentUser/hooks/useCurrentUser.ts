import { WatchQueryFetchPolicy } from '@apollo/client';
import { DeepNonNullable } from 'utility-types';

import { useMe } from '../graphql';

import { StrictType, UserDto } from '$shared';

type ReturnType<Strict extends StrictType = StrictType.NOT_STRICT> = {
  isLoading: boolean;
  user: Strict extends StrictType.STRICT
    ? DeepNonNullable<UserDto>
    : UserDto | null;
};

export const useCurrentUser = <
  Strict extends StrictType = StrictType.NOT_STRICT,
>(
  fetchPolicy?: WatchQueryFetchPolicy,
): ReturnType<Strict> => {
  const {
    getMe: { data, loading: isLoading },
  } = useMe({
    fetchPolicy: fetchPolicy ?? undefined,
  });

  return {
    user: data,
    isLoading,
  } as ReturnType<Strict>;
};
