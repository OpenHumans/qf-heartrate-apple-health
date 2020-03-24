/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import PrivacyInformationComponent from './src/components/PrivacyInformationComponent';

const App: () => React$Node = () => {
  const Stack = createStackNavigator();
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyInformationComponent}
            options={{
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#5D71BA',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
