export * from './iconBuilder';

export const logPrettied = (data: unknown) =>
  // eslint-disable-next-line no-console, no-magic-numbers -- for debug
  console.log(JSON.stringify(data, null, 2));

export const stringToColor = (str: string) => {
  let hash = 0;

  for (let index = 0; index < str.length; index++) {
    // eslint-disable-next-line no-bitwise, no-magic-numbers -- generator fo color
    hash = str.charCodeAt(index) + ((hash << 5) - hash);
  }

  const seconds = 360;

  const h = hash % seconds;

  return `hsl(${h}, 30%, 80%)`;
};

export type GraphQlInput<T> = {
  input: T;
};

export type GraphQlResponse<T> = {
  response: T;
};
