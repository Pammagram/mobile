export const capitalize = <Type extends string>(str: Type): Capitalize<Type> =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<Type>;

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
