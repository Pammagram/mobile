import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { Text, View } from 'react-native';

const App: FC = () => {
  return (
    <View>
      <Text>Dummy screen!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
