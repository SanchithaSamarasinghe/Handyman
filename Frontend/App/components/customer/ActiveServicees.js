import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Header from '../common/Header';
import axios from '../../src/api/axiosConfig';

export default function ActiveServicees({ email }) {
  const [bookedProfessionals, setBookedProfessionals] = useState([]);

  useEffect(() => {
    fetchBookedProfessionals();
  }, []);

  const fetchBookedProfessionals = async () => {
    try {
      // Placeholder API call - update with actual backend endpoint
      const response = await axios.get('/booking/bookedProfessionals', {
      params: { customerEmail: email } // ✅ required by backend
    });
      setBookedProfessionals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDayCountdown = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
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
          Days until appointment: {calculateDayCountdown(item.bookedDate)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {bookedProfessionals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No active bookings found.</Text>
        </View>
      ) : (
        <FlatList
          data={bookedProfessionals}
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