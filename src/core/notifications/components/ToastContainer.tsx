import Toast from 'react-native-toast-message';

import { MessageToast } from '$core/notifications/components/MessageToast';

export const ToastContainer = () => {
  return (
    <Toast
      config={{
        message: MessageToast,
      }}
    />
  );
};
