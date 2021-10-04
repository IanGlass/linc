import 'react-native-gesture-handler';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import store from './store/store';


import Navigator from './navigation/Navigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onError={(error) => console.log(error)}
      onFinish={() => setDataLoaded(true)}
    />
  }

  return (
    <NavigationContainer>
      <Provider store={store}>

        <Navigator />
      </Provider>

    </NavigationContainer>
  );
}
