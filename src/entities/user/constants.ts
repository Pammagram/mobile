import { makeVar } from '@apollo/client';

import { UserDto } from '$shared';

export const userVar = makeVar<UserDto | null>(null);
