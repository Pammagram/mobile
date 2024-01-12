import { Slot } from 'expo-router';
import { FC } from 'react';

import { combineProviders } from '$core/providers';

const manager = combineProviders();
const MasterProvider = manager.master();

const PreProviderApp: FC = () => {
  return (
    <MasterProvider>
      <Slot />
    </MasterProvider>
  );
};

export default PreProviderApp;
