import Toast, { ToastShowParams } from 'react-native-toast-message';

type ShowToastParams = {
  type: ToastShowParams['type'];
} & ToastShowParams;

export const showNotification = (params: ShowToastParams) => {
  Toast.show(params);
};

export const hideNotification = () => {
  Toast.hide();
};
