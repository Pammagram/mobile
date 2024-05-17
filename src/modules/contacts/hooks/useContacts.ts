import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

import { useLazyUsersByPhoneNumbers } from '../graphql/usersByPhoneNumbers';

import { UserDto } from '$core/graphql';
import { useCurrentUser } from '$modules/user';

export const useContacts = () => {
  const [contacts, setContacts] = useState<UserDto[]>([]);
  const [areContactsLoading, setAreContactsLoading] = useState(true);
  const { getUsersByPhoneNumbers } = useLazyUsersByPhoneNumbers();
  const { user } = useCurrentUser();

  useEffect(() => {
    void (async () => {
      try {
        setAreContactsLoading(true);

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
      } finally {
        setAreContactsLoading(false);
      }
    })();
  }, []);

  return {
    contacts,
    areContactsLoading,
  };
};
