import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention -- icon builder
export const tabBarIcon = (Icon: FC) => (props: Record<string, unknown>) => {
  return <Icon {...props} />;
};
