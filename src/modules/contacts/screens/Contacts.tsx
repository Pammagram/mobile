import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, YStack } from 'tamagui';

import { Contact } from '../components/Contact';
import { ContactSkeleton } from '../components/ContactSkeleton';
import { useContacts } from '../hooks/useContacts';

export const ContactsScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { areContactsLoading, contacts } = useContacts();

  return (
    <YStack f={1}>
      {areContactsLoading && <ContactSkeleton />}
      {!areContactsLoading && contacts.length === 0 && (
        <View f={1} jc="center" ai="center">
          <Text>No contacts yet</Text>
        </View>
      )}
      {!areContactsLoading && contacts.length > 0 && (
        <FlatList
          ListFooterComponent={<View height={bottom} />}
          data={contacts}
          renderItem={(props) => {
            const { item: contact } = props;

            return <Contact key={contact.id} user={contact} />;
          }}
        />
      )}
    </YStack>
  );
};
