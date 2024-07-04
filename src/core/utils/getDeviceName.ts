import * as Device from 'expo-device';

export const getDeviceName = () => {
  return (
    Device.modelName ||
    Device.deviceName ||
    Device.brand ||
    Device.deviceType?.toString() ||
    'Unknown device'
  );
};
