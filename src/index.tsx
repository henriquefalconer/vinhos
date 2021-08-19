import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Providers from './hooks';

import GraphScreen from './screens/GraphScreen';

const App: React.FC = () => {
  return (
    <Providers>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <StatusBar barStyle="light-content" />
        <GraphScreen />
      </SafeAreaView>
    </Providers>
  );
};

export default App;
