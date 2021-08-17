import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import GraphScreen from './screens/GraphScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <GraphScreen />
    </SafeAreaView>
  );
};

export default App;
