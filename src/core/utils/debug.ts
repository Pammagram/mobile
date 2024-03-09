export const logPrettied = (data: unknown) =>
  // eslint-disable-next-line no-console, no-magic-numbers -- for debug
  console.log(JSON.stringify(data, null, 2));
