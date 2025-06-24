import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CHome from '../customer/CustomHome';
import ActiveServices from '../customer/ActiveServicees';
import ServiceHistory from '../customer/ServiceHistory';

const Tab = createBottomTabNavigator();

export default function CustomerMainScreen({ route }) {
  const email = route?.params?.email ?? null;


  return (
    <Tab.Navigator initialRouteName="CHome">
      <Tab.Screen name="CHome" children={() => <CHome email={email} />} />
      <Tab.Screen name="Active Services" children={() => <ActiveServices email={email} />} />
      <Tab.Screen name="Service History" children={() => <ServiceHistory email={email} />} />
    </Tab.Navigator>
  );
}
