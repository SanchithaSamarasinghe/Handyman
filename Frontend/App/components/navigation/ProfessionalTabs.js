import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../professional/Profile';
import AvailableWork from '../professional/AvailableWork';
import WorkHistory from '../professional/WorkHistory';

const Tab = createBottomTabNavigator();

export default function ProfessionalMainScreen({ route }) {
  const { email } = route.params;
  return (
    <Tab.Navigator initialRouteName="Profile">
    <Tab.Screen name="Profile" children={() => <Profile email={email} />} />
    <Tab.Screen name="Available Work" children={() => <AvailableWork email={email} />} />
    <Tab.Screen name="Work History" children={() => <WorkHistory email={email} />} />
    </Tab.Navigator>

  );
}
