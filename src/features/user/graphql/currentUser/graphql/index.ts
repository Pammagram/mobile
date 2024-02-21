import { Data, PREFIX, QUERY } from './query';

import { useCustomQuery, UseQueryWrapper } from '$shared';

export type UseMe = UseQueryWrapper<typeof PREFIX, Data, never>;

export const useMe: UseMe = (...args) => useCustomQuery(PREFIX, QUERY, ...args);
