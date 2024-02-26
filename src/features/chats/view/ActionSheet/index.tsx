/* eslint-disable no-magic-numbers -- temp solution */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Colors } from 'configs/constants';
import { router } from 'expo-router';
import { useCreateChat, useMyChats } from 'features/chats/graphql';
import { useMe, useUsers } from 'features/user';
import { FC } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import ActionSheet, {
  registerSheet,
  SheetDefinition,
  SheetManager,
} from 'react-native-actions-sheet';
import { Text, XStack, YStack } from 'tamagui';

import { Icon } from './Icon';

import { ChatType } from '$shared';

export type CustomActionSheetProps = {
  payload: {
    apolloClient: ApolloClient<NormalizedCacheObject>;
  };
};

export const CustomActionSheet: FC<CustomActionSheetProps> = (props) => {
  const {
    payload: { apolloClient },
  } = props;

  // TODO custom hook
  const { getMe } = useMe({
    client: apolloClient,
  });

  const { getUsers } = useUsers({
    client: apolloClient,
  });

  const { getMyChats } = useMyChats({
    client: apolloClient,
    variables: {
      input: {},
    },
  });

  const { createChat } = useCreateChat({
    client: apolloClient,
  });

  return (
    <ActionSheet
      indicatorStyle={styles.indicatorStyle}
      containerStyle={styles.actionSheet}
      gestureEnabled
      animated
    >
      <YStack>
        <YStack marginTop={10}>
          {getUsers.data?.data
            .filter((user) => user.id !== getMe.data?.data?.id)
            .map((user, index) => {
              return (
                <TouchableOpacity
                  onPress={async () => {
                    let privateChat = getMyChats.data?.data.find(
                      (chat) =>
                        chat.type === ChatType.Private &&
                        chat.members.find((member) => member.id === user.id),
                    );

                    if (!privateChat) {
                      const response = await createChat.request({
                        input: {
                          memberIds: [getMe.data!.data!.id, user.id], // TODO avoid this
                          type: ChatType.Private,
                          title: 'redundant',
                        },
                      });

                      privateChat = response?.data;
                    }

                    void hideActionSheet();
                    router.push(`/chats/${privateChat?.id}`);
                  }}
                  key={index}
                >
                  <XStack gap={10} padding={10}>
                    <Icon />
                    <YStack>
                      <Text>{user.username}</Text>
                      <Text>Last - 30 minutes ago</Text>
                    </YStack>
                  </XStack>
                </TouchableOpacity>
              );
            })}
        </YStack>
      </YStack>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  actionSheet: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: Dimensions.get('window').height * 0.85,
    backgroundColor: Colors.TERNARY_RED,
  },
  indicatorStyle: {
    width: 100,
  },
});

export const ACTION_SHEET = 'action-sheet';

export const showActionSheet = (payload: CustomActionSheetProps['payload']) =>
  SheetManager.show(ACTION_SHEET, {
    payload,
  });

export const hideActionSheet = () => SheetManager.hide(ACTION_SHEET);

registerSheet(ACTION_SHEET, CustomActionSheet);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    ['action-sheet']: SheetDefinition<CustomActionSheetProps>;
  }
}
