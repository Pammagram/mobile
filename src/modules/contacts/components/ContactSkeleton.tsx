import { TouchableOpacity } from 'react-native';
import { XStack, YStack } from 'tamagui';

import { TextPlaceholder } from '$core/components/TextPlaceholder';
import { Icon } from '$modules/chats/view';

export const ContactSkeleton = () => {
  return (
    <TouchableOpacity key="map">
      <XStack ai="center">
        <XStack gap={10} padding={10}>
          <Icon />
          <YStack gap={5}>
            <TextPlaceholder w={50} h={16} />
            <TextPlaceholder w={150} h={12} />
          </YStack>
        </XStack>
      </XStack>
    </TouchableOpacity>
  );
};
