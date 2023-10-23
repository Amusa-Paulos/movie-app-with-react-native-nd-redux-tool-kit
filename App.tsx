/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './components/shared/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import { PaperProvider } from 'react-native-paper';
import MovieDetails from './components/MovieDetails';
const Stack = createNativeStackNavigator();


const App = React.memo((props) => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="movieDetails" component={MovieDetails} 
              options={{headerTitle: 'Details', headerBackTitleVisible: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
})

export default App;
