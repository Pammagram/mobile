import { forwardRef, memo, Ref, useCallback } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { Spinner } from 'tamagui';

import { Message } from './components/Message';
import { Spacer } from './components/Spacer';
import { TimeStamp } from './components/TimeStamp';
import { useLogic } from './useLogic';
import { getShouldShowTimeStamp } from './utils';

import { View } from '$core/components';
import { ChatMessage } from '$modules/chats/graphql/documents';

export const Messages = memo(
  forwardRef((_props, ref: Ref<FlatList<ChatMessage>>) => {
    const { areMessagesLoading, messages, user } = useLogic();

    // eslint-disable-next-line react-hooks/exhaustive-deps -- memoized messages
    const renderItemHandler = useCallback(
      (({ item: message, index }) => {
        const showTimeStamp = getShouldShowTimeStamp(
          message,
          messages[index + 1],
        );

        return (
          <>
            <Message
              isFromMe={message.sender.id === user?.data?.id}
              showAvatar={messages[index - 1]?.sender.id !== message.sender.id}
              message={message}
            />
            {showTimeStamp && <TimeStamp date={messages[index].createdAt} />}
          </>
        );
      }) satisfies FlatListProps<ChatMessage>['renderItem'],
      [messages],
    );

    return (
      <View height="100%" flex={1}>
        {areMessagesLoading && (
          <View flex={1} justifyContent="center">
            <Spinner />
          </View>
        )}
        {!areMessagesLoading && messages && (
          <FlatList
            maxToRenderPerBatch={30}
            renderItem={renderItemHandler}
            ref={ref}
            inverted
            ListFooterComponent={<Spacer />}
            showsVerticalScrollIndicator={false}
            data={messages}
            initialNumToRender={15}
          />
        )}
      </View>
    );
  }),
);
