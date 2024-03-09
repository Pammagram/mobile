import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import { create, useStore } from 'zustand';

import { useMe } from '$features';
import { ChatType } from '$shared';

export type UseCreateChat = {
  chatType: ChatType.Group;
  memberIds: number[];

  setMemberIds: (memberIds: number[]) => void;

  setTitle: (title: string) => void;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- it's a component
const CreateChatContext = createContext(null);

export const CreateChatProvider: FC<PropsWithChildren> = ({ children }) => {
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
