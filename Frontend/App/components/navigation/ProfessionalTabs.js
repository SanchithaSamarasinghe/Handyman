import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../professional/Profile';
import AvailableWork from '../professional/AvailableWork';
import WorkHistory from '../professional/WorkHistory';

const Tab = createBottomTabNavigator();

export default function ProfessionalMainScreen() {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Available Work" component={AvailableWork} />
      <Tab.Screen name="Work History" component={WorkHistory} />
    </Tab.Navigator>
  );
}
