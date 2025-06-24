import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import axios from '../src/api/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  

const login = async () => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    const role = response.data;

    await AsyncStorage.setItem('userEmail', email); // ✅ save login email

    if (role === 'PROFESSIONAL') {
      navigation.navigate('ProfessionalMainScreen');
    } else if (role === 'CUSTOMER') {
      navigation.navigate('CustomerMainScreen', { email });
    } else {
      setSnackbarMsg('Unexpected role.');
    }

  } catch (err) {
    setSnackbarMsg(err.response?.data || 'Invalid Email or Password');
  } finally {
    setSnackbarVisible(true);
  }
};


  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.imagepad}>
            <Image source={require('../assets/HM/login.png')} style={styles.image} />
          </View>

          <TextInput label="Email" value={email} onChangeText={setEmail} />
          <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />

          <Button style={styles.button1} onPress={login}>Login</Button>
          <Button style={styles.button2} onPress={() => navigation.navigate('RegisterScreen')}>Register</Button>

          <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)}>
            {snackbarMsg}
          </Snackbar>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
  },
  imagepad: {
    padding: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    width: '80%',
    height: 200,
  },
  button1: {
    backgroundColor: '#33cc33',
    marginVertical: 5
  },
  button2: {
    backgroundColor: '#0066cc',
    marginVertical: 5
  },
  scrollView: {
    flexGrow: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  }
});
