// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MenuScreen from './MenuScreen';
import DisponibilidadScreen from './DisponibilidadScreen';
import HorariosScreen from './HorariosScreen';
import AulasScreen from './AulasScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="DisponibilidadScreen" component={DisponibilidadScreen} />
        <Stack.Screen name="HorariosScreen" component={HorariosScreen} />
        <Stack.Screen name="AulasScreen" component={AulasScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
