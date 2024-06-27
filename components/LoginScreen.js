import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../services/FirebaseService';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully!', user);
      // Εδώ μπορείς να προχωρήσεις σε μετάβαση σε άλλη οθόνη ή ενέργειες για τον συνδεδεμένο χρήστη
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(email, password);
      console.log('User signed up successfully!', user);
      // Εδώ μπορείς να προχωρήσεις σε μετάβαση σε άλλη οθόνη ή ενέργειες για τον νέο χρήστη
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default LoginComponent;
