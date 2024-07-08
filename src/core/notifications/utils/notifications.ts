import Toast, { ToastShowParams } from 'react-native-toast-message';

export const showNotification = (params: ToastShowParams) => {
  Toast.show(params);
};

export const hideNotification = () => {
  Toast.hide();
};
