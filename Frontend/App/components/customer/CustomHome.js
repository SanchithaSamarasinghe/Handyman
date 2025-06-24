import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';


const professions =  [
  { id: '1', name: 'Electrician', image: require('../../assets/HM/h8.png') },
  { id: '2', name: 'Plumber', image: require('../../assets/HM/h1.png') },
  { id: '3', name: 'Carpenter', image: require('../../assets/HM/h9.png') },
  { id: '4', name: 'Painter', image: require('../../assets/HM/h4.png') },
  { id: '5', name: 'Cleaner', image: require('../../assets/HM/h2.png') },
  { id: '6', name: 'Gardener', image: require('../../assets/HM/h6.png') },
  { id: '7', name: 'Mover', image: require('../../assets/HM/h14.png') },
  
  { id: '8', name: 'BodyGuard', image: require('../../assets/HM/h12.png') },// Add more professions as needed
  { id: '9', name: 'Driver', image: require('../../assets/HM/h10.png') },
  { id: '10', name: 'Chef', image: require('../../assets/HM/h13.png') },
  { id: '11', name: 'Vediocrew', image: require('../../assets/HM/h11.png') },
  { id: '12', name: 'HairDresser', image: require('../../assets/HM/h15.png') },
  { id: '13', name: 'Security Guard', image: require('../../assets/HM/h3.png') },
  { id: '14', name: 'Machanic', image: require('../../assets/HM/h5.png') },
  { id: '15', name: 'Fixer', image: require('../../assets/HM/h7.png') },
  { id: '16', name: 'Cable fixer', image: require('../../assets/HM/h8.png') },
  { id: '17', name: 'Electric fixer', image: require('../../assets/HM/h6.png') },
];

export default function CustomHome({ email }) {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const filteredProfessions = professions.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
     onPress={() => navigation.navigate('ActiveProfessionals', {
  profession: item.name,
  customerEmail: email, // ✅ pass customer email here
})}

    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search professions..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={filteredProfessions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  grid: {
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
