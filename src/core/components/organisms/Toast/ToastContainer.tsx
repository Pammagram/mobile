import Toast from 'react-native-toast-message';

import { MessageToast } from './MessageToast';

export const ToastContainer = () => {
  return (
    <Toast
      config={{
        message: MessageToast,
      }}
    />
  );
};
