import { FC } from 'react';
import { Avatar } from 'tamagui';

export const Icon: FC = () => (
  <Avatar circular size="$2.5">
    <Avatar.Image src="http://placekitten.com/200/300" />
    <Avatar.Fallback bc="red" />
  </Avatar>
);
