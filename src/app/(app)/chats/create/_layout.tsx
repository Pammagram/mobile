import { HeaderButtonProps } from '@react-navigation/native-stack/src/types';
import { router, Stack } from 'expo-router';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'tamagui';
import { create, useStore } from 'zustand';

import { useCreateChat, useMe } from '$features';
import { ChatType } from '$shared';

type UseCreateChat = {
  chatType: ChatType.Group;
  memberIds: number[];

  // setChatType: (type: ChatType) => void;
  setMemberIds: (memberIds: number[]) => void;

  setTitle: (title: string) => void;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- it's a component
const CreateChatContext = createContext(null);

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { getMe } = useMe();

  const storeRef = useRef(null);

  if (!storeRef.current) {
    // @ts-expect-error -- this is the way described in documentation
    storeRef.current = create<UseCreateChat>((set) => ({
      chatType: ChatType.Group,
      memberIds: [getMe.data!.data!.id],
      title: '',

      // setChatType: (type) => set({ chatType: type }),
      setMemberIds: (memberIds) => set({ memberIds }),
      setTitle: (title) => set({ title }),
    }));
  }

  return (
    <CreateChatContext.Provider value={storeRef.current}>
      {children}
    </CreateChatContext.Provider>
  );
};

export const useCreateGroupChat = (): UseCreateChat => {
  const store = useContext(CreateChatContext);

  if (!store) {
    throw new Error('Missing StoreProvider');
  }

  return useStore(store);
};

const CreateGroupChatCreateButton: FC<HeaderButtonProps> = (props) => {
  const { tintColor } = props;
  const { title, memberIds, chatType } = useCreateGroupChat();
  const { createChat } = useCreateChat({});

  return (
    <TouchableOpacity
      disabled={!title?.length}
      onPress={async () => {
        await createChat.request({
          input: {
            memberIds,
            title,
            type: chatType,
          },
        });
        router.navigate('/(app)/chats');
      }}
    >
      <Text color={!title?.length ? undefined : tintColor}>Create</Text>
    </TouchableOpacity>
  );
};

const CreateGroupChatNextButton: FC<HeaderButtonProps> = (props) => {
  const { tintColor } = props;

  return (
    <TouchableOpacity
      onPress={() => router.push('/(app)/chats/create/group-final-step')}
    >
      <Text col={tintColor}>Next</Text>
    </TouchableOpacity>
  );
};

const Layout: FC = () => {
  return (
    <StoreProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            freezeOnBlur: true,
          }}
        />
        <Stack.Screen
          name="group"
          options={{
            headerRight: CreateGroupChatNextButton,
          }}
        />
        <Stack.Screen
          name="group-final-step"
          options={{
            headerRight: CreateGroupChatCreateButton,
          }}
        />
      </Stack>
    </StoreProvider>
  );
};

export default Layout;
