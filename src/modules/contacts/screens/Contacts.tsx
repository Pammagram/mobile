import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, XStack, YStack } from 'tamagui';

import { Icon } from '$modules/chats/view';
import { useUsers } from '$modules/user';

export const ContactsScreen = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const { getUsers } = useUsers();

  useEffect(() => {
    void (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        setContacts(data);
      }
    })();
  }, []);

  const { bottom } = useSafeAreaInsets();

  const availableContacts = contacts.filter((contact) => {
    const phoneNumbers = contact.phoneNumbers?.map(({ digits }) => digits);

    const users = getUsers.data?.data;

    const hasAccount = users?.some((user) => {
      const userPhoneNumber = user.phoneNumber;

      return phoneNumbers?.some((phoneNumber) =>
        userPhoneNumber.includes(phoneNumber),
      );
    });

    return hasAccount;
  });

  return (
    <YStack f={1}>
      <FlatList
        ListFooterComponent={<View height={bottom} />}
        data={availableContacts}
        renderItem={(props) => {
          const { item: contact } = props;

          return (
            <TouchableOpacity key={contact.id}>
              <XStack ai="center">
                <XStack gap={10} padding={10}>
                  <Icon />
                  <YStack>
                    <Text>
                      {contact.firstName} {contact.lastName}
                    </Text>
                    <Text>Last - 30 minutes ago</Text>
                  </YStack>
                </XStack>
              </XStack>
            </TouchableOpacity>
          );
        }}
      />
    </YStack>
  );
};
