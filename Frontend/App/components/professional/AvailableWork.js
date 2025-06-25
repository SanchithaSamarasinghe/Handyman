import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import Header from '../common/Header';
import axios from '../../src/api/axiosConfig';

export default function AvailableWork({ email }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await axios.get('/booking/professional', {
        params: { professionalEmail: email, completed: false }
      });
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const markCompleted = async (bookingId) => {
    try {
      await axios.put(`/booking/markCompleted/${bookingId}`);
      fetchWorks(); // Refresh the list
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text>Customer: {item.customerEmail}</Text>
      <Text>Date: {item.date}</Text>
      <Button title="Completed" onPress={() => markCompleted(item.id)} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {bookings.length === 0 ? (
        <View style={styles.empty}>
          <Text>No available works</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: '#e0f7fa',
    borderRadius: 10
  },
  empty: {
    marginTop: 50,
    alignItems: 'center'
  },
  list: {
    padding: 10
  }
});
