import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar, HelperText, Menu } from 'react-native-paper';
import axios from '../src/api/axiosConfig';
import { useNavigation } from '@react-navigation/native';

const roles = ['CUSTOMER', 'PROFESSIONAL'];

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const onSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post('/auth/register', form);
      setSnackbarMsg(response.data || 'User registered successfully.');
      setForm({ name: '', email: '', password: '', role: '' }); // clear form
    } catch (error) {
      setSnackbarMsg(error.response?.data || 'Registration failed.');
    } finally {
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
        error={!!errors.name}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.name}>
        {errors.name}
      </HelperText>

      <TextInput
        label="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
        error={!!errors.email}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.email}>
        {errors.email}
      </HelperText>

      <TextInput
        label="Password"
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
        error={!!errors.password}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.password}>
        {errors.password}
      </HelperText>

    <View style={styles.roleButtons}>
  <Button
    mode={form.role === 'CUSTOMER' ? 'contained' : 'outlined'}
    onPress={() => handleChange('role', 'CUSTOMER')}
    style={styles.roleButton}
  >
    Customer
  </Button>
  <Button
    mode={form.role === 'PROFESSIONAL' ? 'contained' : 'outlined'}
    onPress={() => handleChange('role', 'PROFESSIONAL')}
    style={styles.roleButton}
  >
    Professional
  </Button>
</View>
<HelperText type="error" visible={!!errors.role}>
  {errors.role}
</HelperText>


      <Button mode="contained" onPress={onSubmit} style={styles.button}>
        Register
      </Button>

      <Button onPress={() => navigation.navigate('Login')} style={styles.button}>
        Already have an account? Login
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 12,
  },
  roleButtons: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 8,
  marginBottom: 4,
},
roleButton: {
  flex: 1,
  marginHorizontal: 5,
}

});
