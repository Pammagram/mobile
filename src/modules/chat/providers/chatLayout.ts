import { create } from 'zustand';

type ChatHeaderParams = {
  inputHeight: number;
  messagesContainerHeight: number;

  setInputHeight: (height: number) => void;
  setMessagesContainerHeight: (height: number) => void;
};

export const useChatLayout = create<ChatHeaderParams>((set) => ({
  inputHeight: 0,
  setInputHeight: (inputHeight: number) => set({ inputHeight }),

  messagesContainerHeight: 0,
  setMessagesContainerHeight: (messagesContainerHeight: number) =>
    set({ messagesContainerHeight }),
}));
