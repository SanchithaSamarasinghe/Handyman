import React from 'react';
import { View, Text } from 'react-native';
import Header from '../common/Header';

export default function Profile() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>customer ActiveServices Screen</Text>
      </View>
    </View>
  );
}
