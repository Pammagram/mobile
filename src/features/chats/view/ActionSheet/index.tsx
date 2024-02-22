/* eslint-disable no-magic-numbers -- temp solution */
import { Colors } from 'configs/constants';
import { Dimensions, View } from 'react-native';
import ActionSheet, {
  registerSheet,
  SheetManager,
} from 'react-native-actions-sheet';
import { Avatar, Text, XStack, YStack } from 'tamagui';

const ACTION_SHEET = 'action-sheet';

export const toggleActionSheet = () => SheetManager.show(ACTION_SHEET);

const Icon = () => (
  <Avatar circular size="$2.5">
    <Avatar.Image src="http://placekitten.com/200/300" />
    <Avatar.Fallback bc="red" />
  </Avatar>
);

export const CustomActionSheet = () => {
  return (
    <ActionSheet
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: Dimensions.get('window').height * 0.85,
        backgroundColor: Colors.TERNARY_RED,
      }}
      indicatorStyle={{
        width: 100,
      }}
      gestureEnabled
      animated
    >
      <View
        style={{
          borderRadius: 15,

          width: Dimensions.get('window').width,
          zIndex: 10,
          height: Dimensions.get('window').height * 0.9,
        }}
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
      </View>
    </ActionSheet>
  );
};

registerSheet(ACTION_SHEET, CustomActionSheet);
