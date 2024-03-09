import { TypePolicies } from '@apollo/client';

import { chatsTypePolicy } from '$modules/chats/graphql/typePolicies';

export const customTypePolicies: TypePolicies[] = [chatsTypePolicy];
