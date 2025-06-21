import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from '../../src/api/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../common/Header';

const professionOptions = ['Electrician', 'Plumber', 'Carpenter', 'Painter'];

export default function Profile() {
  //const userEmail = 'sanchitha@mail.com'; // 🔁 Replace this with actual logged-in user's email

  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const loadEmailAndProfile = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUserEmail(email);              // ✅ save to state
          await fetchProfile(email);        // ✅ only call if not null
        } else {
          console.warn('No email found in storage');
        }
      } catch (err) {
        console.error('Failed to load email from storage', err);
      }
    };

    loadEmailAndProfile();
  }, []);

  const fetchProfile = async (email) => {
    try {
      const response = await axios.get(`/profile/${email}`);
      const data = response.data;
      setDisplayName(data.name);
      setId(data.id);
      setDescription(data.description || '');
      setSelectedProfessions(data.professions || []);
      if (data.imageBase64) {
        setImageUri(`data:image/jpeg;base64,${data.imageBase64}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to load profile");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      setImageBase64(asset.base64);
    }
  };

  const toggleProfession = (profession) => {
    if (selectedProfessions.includes(profession)) {
      setSelectedProfessions((prev) => prev.filter((p) => p !== profession));
    } else {
      setSelectedProfessions((prev) => [...prev, profession]);
    }
  };

  const saveProfile = async () => {
    try {
      await axios.put(`/profile/${userEmail}`, {
        name: displayName,
        id: id,
        description,
        professions: selectedProfessions,
        imageBase64,
      });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (err) {
      console.error(err);
      Alert.alert('Update failed', err.response?.data || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <Text>Tap to Upload</Text>
          </View>
        )}
      </TouchableOpacity>
      
      {/* Save Button */}
      <Button mode="contained" onPress={saveProfile} style={styles.button}>
        Save Profile
      </Button>

      {/* Name and ID */}
      <TextInput
        label="Name"
        value={displayName}
        style={styles.input}
        disabled
      />
      <TextInput
        label="ID"
        value={id?.toString()}
        style={styles.input}
        disabled
      />

      {/* Professions */}
      <Text style={styles.label}>Select Professions</Text>
      <View style={styles.checkboxContainer}>
        {professionOptions.map((option) => (
          <View key={option} style={styles.checkboxItem}>
            <Checkbox
              status={selectedProfessions.includes(option) ? 'checked' : 'unchecked'}
              onPress={() => toggleProfession(option)}
            />
            <Text>{option}</Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  placeholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  button: {
    marginTop: 20,
  },
});
