import { DeepNonNullable } from 'utility-types';

import { useMe } from '../graphql';

import { StrictType, UserDto } from '$core/graphql';

type ReturnType<Strict extends StrictType = StrictType.NOT_STRICT> = {
  isLoading: boolean;
  user: Strict extends StrictType.STRICT
    ? DeepNonNullable<UserDto>
    : UserDto | null;
};

export const useCurrentUser = <
  Strict extends StrictType = StrictType.NOT_STRICT,
>(): ReturnType<Strict> => {
  const {
    getMe: { data, loading: isLoading },
  } = useMe({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  return {
    user: data,
    isLoading,
  } as ReturnType<Strict>;
};
