import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      // Clear all relevant user data from AsyncStorage
      await AsyncStorage.clear();
      // Navigate to Home screen (login)
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred during logout.');
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Handyman App</Text>
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
