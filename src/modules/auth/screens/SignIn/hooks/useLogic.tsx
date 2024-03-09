import { LegacyRef, useRef } from 'react';
import { Dimensions, ScrollView } from 'react-native';

import {
  EnterCode,
  SubmitPhone,
} from '$modules/auth/screens/SignIn/components';

export const useLogic = () => {
  const scrollRef = useRef<ScrollView>();

  const afterSubmit = () => {
    scrollRef?.current?.scrollToEnd({ animated: true });
  };

  const components = [
    <SubmitPhone afterSubmit={afterSubmit} key={SubmitPhone.name} />,
    <EnterCode key={EnterCode.name} />,
  ];

  const screenWidth = Dimensions.get('screen').width;

  return {
    scrollRef: scrollRef as LegacyRef<ScrollView>,
    screenWidth,
    components,
  };
};
