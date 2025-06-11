import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Avatar, Chip } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
//import DropDownPicker from 'react-native-dropdown-picker';

export default function Profile() {
  const [image, setImage] = useState(null);
  const [displayName, setDisplayName] = useState('Sanchitha');
  const [id, setId] = useState('PRO123456');
  const [description, setDescription] = useState('');
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [open, setOpen] = useState(false);
  const [professions, setProfessions] = useState([
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Carpenter', value: 'Carpenter' },
    { label: 'Painter', value: 'Painter' },
  ]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const updateDescription = () => {
    console.log('Updated Description:', description);
    // TODO: Send description update to backend
  };

  return (
    <View style={styles.container}>

      {/* Top Row: Profile Picture + Profession Selector */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <Avatar.Icon size={80} icon="camera" style={styles.avatar} />
          )}
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: 10 }}>
          
          <View style={styles.chipContainer}>
            {selectedProfessions.map((prof, index) => (
              <Chip key={index} style={styles.chip}>{prof}</Chip>
            ))}
          </View>
        </View>
      </View>

      {/* Name & ID */}
      <TextInput
        label="Name"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
        disabled
      />
      <TextInput
        label="ID"
        value={id}
        style={styles.input}
        disabled
      />

      {/* Description */}
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
      />

      <Button mode="contained" onPress={updateDescription} style={styles.button}>
        Update Profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    margin: 2,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
