/* eslint-disable no-magic-numbers -- temp solution */
import { Colors } from 'configs/constants';
import { Dimensions, StyleSheet } from 'react-native';
import ActionSheet, {
  registerSheet,
  SheetManager,
} from 'react-native-actions-sheet';
import { Text, XStack, YStack } from 'tamagui';

import { Icon } from './Icon';

export const CustomActionSheet = () => {
  return (
    <ActionSheet
      indicatorStyle={styles.indicatorStyle}
      containerStyle={styles.actionSheet}
      gestureEnabled
      animated
    >
      <YStack>
        <YStack marginTop={10}>
          {Array.from(Array(10).keys()).map((el, index) => {
            return (
              <XStack gap={10} key={index} padding={10}>
                <Icon />
                <YStack>
                  <Text>John Doe</Text>
                  <Text>Last - 30 minutes ago</Text>
                </YStack>
              </XStack>
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

const ACTION_SHEET = 'action-sheet';

registerSheet(ACTION_SHEET, CustomActionSheet);

export const toggleActionSheet = () => SheetManager.show(ACTION_SHEET);
