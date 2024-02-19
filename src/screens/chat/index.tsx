import { FC, memo, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import {
  GiftedChat,
  IMessage,
  Message,
  MessageProps,
} from 'react-native-gifted-chat';

import { transformMessage, useLogic } from './useLogic';

import { useCurrentUser } from '$features';
import { StrictType } from '$shared';

const CustomMessage: FC<MessageProps<IMessage>> = memo(
  (props) => {
    const { currentMessage } = props;

    console.log('rerender');

    return <Message {...props} />;
  },
  () => false,
);

export const ChatScreen: FC = () => {
  const { getChatMessages, sendMessage } = useLogic();
  const { data: messagesData, loading: areMessagesLoading } = getChatMessages;
  const { user } = useCurrentUser<StrictType.STRICT>();

  // const [message, setMessage] = useState('');

  const transformedMessages = useMemo(
    () =>
      messagesData?.data.map((message) => transformMessage(message)).reverse(),
    [messagesData?.data.length],
  );

  const onSendHandler = useCallback((messages: IMessage[]) => {
    const { text } = messages[0];

    void sendMessage({ text });
  }, []);

  if (areMessagesLoading) {
    return null;
  }

  console.log('rerender the whole component');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GiftedChat
        // text={message}
        // onInputTextChanged={(text) => setMessage(text)}
        user={{
          _id: user.id,
          name: user.username,
        }}
        // renderMessage={CustomMessage}
        onSend={onSendHandler}
        messages={transformedMessages}
      />
    </SafeAreaView>
  );
};
