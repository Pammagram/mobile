import Toast from 'react-native-toast-message';

type ShowMessageParams = {
  sender: string;
  text: string;
};

export const showMessage = (params: ShowMessageParams) => {
  const { sender, text } = params;

  Toast.show({
    type: 'message',
    text1: sender,
    text2: text,
  });
};
