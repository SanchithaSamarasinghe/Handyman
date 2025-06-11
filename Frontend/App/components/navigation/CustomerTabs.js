import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import ActiveServices from '../customer/ActiveServicees';
import ServiceHistory from '../customer/ServiceHistory';

const Tab = createBottomTabNavigator();

export default function CustomerMainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Active Services" component={ActiveServices} />
      <Tab.Screen name="Service History" component={ServiceHistory} />
    </Tab.Navigator>
  );
}
