import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import axios from '../api/axiosConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarError, setSnackbarError] = useState(false);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbarMsg('Please fill all fields');
      setSnackbarError(true);
      setSnackbarVisible(true);
      return;
    }
    if (!validateEmail(email)) {
      setSnackbarMsg('Please enter a valid email');
      setSnackbarError(true);
      setSnackbarVisible(true);
      return;
    }
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });
      setSnackbarMsg(response.data || 'Login successful');
      setSnackbarError(false);
      setSnackbarVisible(true);
      // Optionally clear form or navigate to home screen
      setEmail('');
      setPassword('');
    } catch (error) {
      setSnackbarMsg(error.response?.data || 'Login failed');
      setSnackbarError(true);
      setSnackbarVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
        <Button
          onPress={() => navigation.navigate('Register')}
          style={styles.link}
          uppercase={false}
        >
          Don't have an account? Register
        </Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        style={snackbarError ? styles.snackbarError : styles.snackbarSuccess}
      >
        {snackbarMsg}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  link: {
    marginTop: 12,
    alignSelf: 'center',
  },
  snackbarError: {
    backgroundColor: '#d32f2f',
  },
  snackbarSuccess: {
    backgroundColor: '#388e3c',
  },
});

export default LoginScreen;
