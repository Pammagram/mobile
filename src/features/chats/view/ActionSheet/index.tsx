/* eslint-disable no-magic-numbers -- temp solution */
import { ApolloClient } from '@apollo/client';
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
    apolloClient: ApolloClient<object>;
  };
};

export const CustomActionSheet: FC<CustomActionSheetProps> = (props) => {
  const {
    payload: { apolloClient },
  } = props;
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
