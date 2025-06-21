import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from '../../src/api/axiosConfig';
import Header from '../common/Header';

export default function ActiveProfessionals({ route, navigation }) {
  const { profession, customerEmail } = route.params; // ✅ customerEmail passed via navigation
  const [selectedDate, setSelectedDate] = useState(null);
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableProfessionals(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableProfessionals = async (date) => {
    try {
      const response = await axios.get(`/profile/professionals/available`, {
        params: { profession, date }
      });
      setProfessionals(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch available professionals');
    }
  };

  const bookProfessional = async (professionalId) => {
    try {
      await axios.post(`/booking`, {
        professionalId,
        customerEmail,
        date: selectedDate,
      });
      Alert.alert('Success', 'Professional booked successfully');
      fetchAvailableProfessionals(selectedDate);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to book professional');
    }
  };

  const renderProfessional = ({ item }) => (
    <View style={styles.professionalCard}>
      <Image
        source={{ uri: item.imageBase64 ? `data:image/jpeg;base64,${item.imageBase64}` : null }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text>Selected Dates: {item.selectedDates?.join(', ') || 'None'}</Text>
      <TouchableOpacity style={styles.bookButton} onPress={() => bookProfessional(item.email)}>
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' }
        }}
      />
      {selectedDate ? (
        <FlatList
          data={professionals}
          keyExtractor={item => item.email}
          renderItem={renderProfessional}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.selectDateMessage}>
          <Text>Please select a date to see available professionals.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  professionalCard: {
    backgroundColor: '#f0f0f0',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  selectDateMessage: {
    marginTop: 20,
    alignItems: 'center',
  },
});
