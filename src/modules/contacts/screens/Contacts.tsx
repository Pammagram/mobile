import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, XStack, YStack } from 'tamagui';

import { useLazyUsersByPhoneNumbers } from '../graphql/usersByPhoneNumbers';

import { UserDto } from '$core/graphql';
import { Icon } from '$modules/chats/view';
import { useCurrentUser } from '$modules/user';

export const ContactsScreen = () => {
  const [contacts, setContacts] = useState<UserDto[]>([]);
  const { getUsersByPhoneNumbers } = useLazyUsersByPhoneNumbers();
  const { user } = useCurrentUser();

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

        const possibleContactsPhoneNumbers = data
          .map(
            ({ phoneNumbers }) =>
              (phoneNumbers || [])?.map((number) => `${number.digits}`),
          )
          .flat()
          .filter((phoneNumber) => phoneNumber !== user?.phoneNumber);

        const response = await getUsersByPhoneNumbers.request({
          input: {
            phoneNumbers: possibleContactsPhoneNumbers,
          },
        });

        if (response?.users) {
          setContacts(response?.users);
        }
      }
    })();
  }, []);

  const { bottom } = useSafeAreaInsets();

  return (
    <YStack f={1}>
      <FlatList
        ListFooterComponent={<View height={bottom} />}
        data={contacts}
        renderItem={(props) => {
          const { item: contact } = props;

          return (
            <TouchableOpacity key={contact.id}>
              <XStack ai="center">
                <XStack gap={10} padding={10}>
                  <Icon />
                  <YStack>
                    <Text>{contact.username}</Text>
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
