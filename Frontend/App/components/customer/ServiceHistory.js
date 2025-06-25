import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Header from '../common/Header';
import axios from '../../src/api/axiosConfig';

export default function ServiceHistory({ email }) {
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    fetchPastBookings();
  }, []);

  const fetchPastBookings = async () => {
    try {
      const response = await axios.get('/booking/bookedProfessionals', {
        params: { customerEmail: email }
      });

      const today = new Date();

      const past = response.data.filter(item => {
        const bookedDate = new Date(item.bookedDate);
        return bookedDate < today;
      });

      setPastBookings(past);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageBase64 ? `data:image/jpeg;base64,${item.imageBase64}` : null }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.profession}>{item.profession}</Text>
        <Text style={styles.countdown}>
          Completed on: {item.bookedDate}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {pastBookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No past bookings found.</Text>
        </View>
      ) : (
        <FlatList
          data={pastBookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profession: {
    fontSize: 16,
    color: '#555',
  },
  countdown: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
