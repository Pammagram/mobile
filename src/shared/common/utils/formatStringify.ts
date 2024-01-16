const NUMBER_OF_SPACE = 2;

export const formatStringify = (...args: unknown[]): string =>
  JSON.stringify(args, null, NUMBER_OF_SPACE);
