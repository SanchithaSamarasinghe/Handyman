import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../common/Header';
import axios from '../../src/api/axiosConfig';

export default function WorkHistory({ email }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/booking/professional', {
        params: { professionalEmail: email, completed: true }
      });
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text>Customer: {item.customerEmail}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text>No completed works yet</Text>
        </View>
      ) : (
        <FlatList
          data={history}
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
    backgroundColor: '#dcedc8',
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
