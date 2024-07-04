import { DeepNonNullable } from 'utility-types';

import { useMe } from '../graphql';

import { StrictType, UserDto } from '$core/graphql';

type ReturnType<Strict extends StrictType = StrictType.NOT_STRICT> = {
  isLoading: boolean;
  user: Strict extends StrictType.STRICT
    ? DeepNonNullable<UserDto>
    : UserDto | null;
};

type UseCurrentUserParams = Parameters<typeof useMe>;

export const useCurrentUser = <
  Strict extends StrictType = StrictType.NOT_STRICT,
>(
  params?: UseCurrentUserParams,
): ReturnType<Strict> => {
  const {
    getMe: { data, loading: isLoading },
  } = useMe({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    ...params,
  });

  return {
    user: data?.data,
    isLoading,
  } as ReturnType<Strict>;
};
