import { Colors } from 'configs/constants';
import moment from 'moment';
import { FC } from 'react';
import { XStack } from 'tamagui';

import { UserAvatar } from './UserAvatar';

import { Text } from '$core/components';
import { ChatMessage } from '$modules/chats/graphql/documents';

type Props = {
  message: ChatMessage;
  isFromMe?: boolean;
  showAvatar?: boolean;
};

// TODO add avatar and etc.
export const Message: FC<Props> = (props) => {
  const { message, showAvatar = true, isFromMe = true } = props;

  return (
    <XStack
      paddingHorizontal={10}
      paddingVertical={5}
      gap={5}
      justifyContent={isFromMe ? 'flex-end' : 'flex-start'}
      marginLeft={isFromMe ? '$6' : 0}
      marginRight={!isFromMe ? '$11' : 0}
      alignItems="flex-end"
    >
      {!isFromMe && (
        <UserAvatar
          initials={message.sender.username?.[0]}
          isVisible={showAvatar}
        />
      )}
      <XStack
        backgroundColor={isFromMe ? Colors.PRIMARY_BLUE : Colors.TERNARY_BLUE}
        borderRadius={10}
        padding={10}
        gap={5}
        flexWrap="wrap"
        alignItems="flex-end"
      >
        <Text textBreakStrategy="highQuality">{message.text}</Text>
        <XStack gap={2} marginLeft="auto" flexWrap="wrap">
          {/* <Text fontSize={8} color="white">
            edited
          </Text> */}
          <Text fontSize={8} color="white">
            {
              moment(message.createdAt).format('HH:mm')
              // TODO to utils in one place
            }
          </Text>
        </XStack>
      </XStack>
    </XStack>
  );
};
