import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../RegisterScreen';
import Home from '../Home';
import ProfessionalMainScreen from './ProfessionalTabs';
import CustomerMainScreen from './CustomerTabs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ProfessionalMainScreen" component={ProfessionalMainScreen} />
        <Stack.Screen name="CustomerMainScreen" component={CustomerMainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

