import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Snackbar, Text, HelperText, Menu, Divider } from 'react-native-paper';
import axios from '../api/axiosConfig';

const roles = ['User', 'Handyman', 'Admin'];

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarError, setSnackbarError] = useState(false);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
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
      const response = await axios.post('/auth/register', {
        name,
        email,
        password,
        role,
      });
      setSnackbarMsg(response.data || 'Registration successful');
      setSnackbarError(false);
      setSnackbarVisible(true);
      // Optionally clear form or navigate to login
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
    } catch (error) {
      setSnackbarMsg(error.response?.data || 'Registration failed');
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
        <Text style={styles.title}>Register</Text>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
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
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              style={styles.input}
            >
              {role || 'Select Role'}
            </Button>
          }
        >
          {roles.map((r) => (
            <Menu.Item
              key={r}
              onPress={() => {
                setRole(r);
                setMenuVisible(false);
              }}
              title={r}
            />
          ))}
        </Menu>
        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Register
        </Button>
        <Button
          onPress={() => navigation.navigate('Login')}
          style={styles.link}
          uppercase={false}
        >
          Already have an account? Login
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

export default RegisterScreen;
