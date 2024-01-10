import { capitalize } from '$shared/common';

export type GetGraphqlRequestKeyReturnType<Type extends string> =
  `get${Capitalize<Type>}`;

export const getGraphqlRequestKey = <Type extends string>(
  prefix: Type,
): GetGraphqlRequestKeyReturnType<Type> => `get${capitalize(prefix)}`;
