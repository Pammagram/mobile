import moment from 'moment';
import { FC } from 'react';

import { Text, XStack } from '$core/components';

type Props = {
  date: string;
};

export const TimeStamp: FC<Props> = (props) => {
  const { date } = props;

  const dateFormatted = moment(date).format('MMM, D');

  return (
    <XStack justifyContent="center" flex={1}>
      <Text bg="beige">{dateFormatted}</Text>
    </XStack>
  );
};
