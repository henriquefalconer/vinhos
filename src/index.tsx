import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Graph from './screens/Graph';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <Graph />
    </SafeAreaView>
  );
};

export default App;
