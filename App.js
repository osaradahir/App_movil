import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MenuScreen from './MenuScreen';
import DisponibilidadScreen from './DisponibilidadScreen';
import HorariosScreen from './HorariosScreen';
import AulasScreen from './AulasScreen';
import LoginGrupoScreen from './LoginGrupoScreen';
import HorarioGrupoScreen from './HorarioGrupoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="DisponibilidadScreen" component={DisponibilidadScreen} />
        <Stack.Screen name="HorariosScreen" component={HorariosScreen} />
        <Stack.Screen name="AulasScreen" component={AulasScreen} />
        <Stack.Screen name="LoginGrupoScreen" component={LoginGrupoScreen} />
        <Stack.Screen name="HorarioGrupoScreen" component={HorarioGrupoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
