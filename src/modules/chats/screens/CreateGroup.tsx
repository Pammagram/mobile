import { FC } from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, YStack } from 'tamagui';

import { SelectContact } from '$modules/contacts/components/SelectContact';
import { useContacts } from '$modules/contacts/hooks/useContacts';

export const CreateGroupScreen: FC = () => {
  const { contacts } = useContacts();

  const { bottom } = useSafeAreaInsets();

  return (
    <YStack flex={1}>
      <View paddingHorizontal={10} flex={1}>
        <FlatList
          ListFooterComponent={<View height={bottom} />}
          showsVerticalScrollIndicator
          data={contacts}
          renderItem={(item) => <SelectContact user={item.item} />}
        />
      </View>
    </YStack>
  );
};
