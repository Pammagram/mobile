import { FC } from 'react';
import { Avatar } from 'tamagui';

import { Text } from '$core/components';
import { stringToColor } from '$core/utils';

type Props = {
  isVisible: boolean;
  initials?: string;
};

export const UserAvatar: FC<Props> = (props) => {
  const { isVisible, initials } = props;

  return (
    <Avatar
      style={{ opacity: Number(isVisible) }}
      backgroundColor={initials && stringToColor(initials)}
      circular
      size="$2.5"
    >
      {initials && <Text>{initials}</Text>}
      {!initials && (
        <>
          <Avatar.Image src="http://placekitten.com/200/300" />
          <Avatar.Fallback bc="red" />
        </>
      )}
    </Avatar>
  );
};
