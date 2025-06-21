import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CHome from '../customer/CustomHome';
import ActiveServices from '../customer/ActiveServicees';
import ServiceHistory from '../customer/ServiceHistory';

const Tab = createBottomTabNavigator();

export default function CustomerMainScreen() {
  return (
    <Tab.Navigator initialRouteName="CHome">
      <Tab.Screen name="CHome" component={CHome} />
      <Tab.Screen name="Active Services" component={ActiveServices} />
      <Tab.Screen name="Service History" component={ServiceHistory} />
    </Tab.Navigator>
  );
}
