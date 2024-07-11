import { DeepNonNullable } from 'utility-types';

import { useMe } from '../graphql';

import { StrictType, UserDto } from '$core/graphql';
import { Simplify } from '$core/utils';

type ReturnType<Strict extends StrictType = StrictType.NotStrict> = {
  isLoading: boolean;
  user: Strict extends StrictType.Strict
    ? Simplify<DeepNonNullable<UserDto>>
    : UserDto | null;
};

type UseCurrentUserParams = Parameters<typeof useMe>;

export const useCurrentUser = <
  Strict extends StrictType = StrictType.NotStrict,
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
