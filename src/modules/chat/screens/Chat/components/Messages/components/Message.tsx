import { CheckCheck, Clock } from '@tamagui/lucide-icons';
import { Colors } from 'configs/constants';
import moment from 'moment';
import { FC, memo } from 'react';
import { XStack } from 'tamagui';

import { UserAvatar } from './UserAvatar';

import { Text, View } from '$core/components';
import { MessageStatus } from '$modules/chat/types';
import { ChatMessage } from '$modules/chats/graphql/documents';

type Props = {
  message: ChatMessage;
  isFromMe?: boolean;
  showAvatar?: boolean;
};

// TODO add avatar and etc.
export const Message: FC<Props> = memo((props) => {
  const { message, showAvatar = true, isFromMe = true } = props;
  const { status } = message;

  const isPending = status === MessageStatus.Pending;
  const isSent = status === MessageStatus.Sent;

  // TODO extract status to a separate component to avoid rerendering the whole message on status change
  return (
    <XStack
      paddingHorizontal={6}
      paddingVertical={3}
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
        alignItems="flex-end"
        flexWrap="wrap"
      >
        <Text>{message.text}</Text>
        <XStack
          marginLeft="auto"
          marginTop="auto"
          alignItems="center"
          transform={[
            {
              translateY: 6,
            },
            {
              translateX: 6,
            },
          ]}
        >
          {isSent && (
            <View>
              <Text fontSize={8} color="white">
                {moment(message.createdAt).format('HH:mm')}
              </Text>
            </View>
          )}
          {isPending && <Clock color={Colors.WHITE_PRIMARY} size={8} />}
          <CheckCheck size={14} color={Colors.WHITE_PRIMARY} />
        </XStack>
      </XStack>
    </XStack>
  );
});
