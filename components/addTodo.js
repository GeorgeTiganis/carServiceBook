import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Animated, Text, Alert } from 'react-native';
import CategoryPicker from './CategoryPicker';

export default function AddTodo({ navigation }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');
  const [isFocused, setIsFocused] = useState(false);
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const [plateNumber, setPlateNumber] = useState('');
  const [carBrand, setCarBrand] = useState('');
  
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const handleSubmit = async () => {
    if (!plateNumber || !carBrand) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
   
    try {
      const response = await fetch(`${API_URL}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plateNumber: plateNumber,
          carBrand: carBrand,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        Alert.alert('Success', 'Car information has been added.', [
          {
            text: 'OK',
            onPress: () => {
              setPlateNumber('');
              setCarBrand('');
              navigation.navigate('Ολα τα οχήματα');
            }
          }
        ]);
      } else {
        Alert.alert('Error', result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.log('error> ',error)
      Alert.alert('Error', 'Could not connect to the server.');
    } 
  };

  const changeHandler = (val) => {
    setText(val);
  }

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderColorAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderColorAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ddd', '#3498db'], // From light gray to blue
  });

  return (
    <View>
      <Text style={styles.label}>Αριθμός πινακίδας</Text>
      <Animated.View style={[styles.inputContainer, { borderColor }]}>
        <TextInput
          style={styles.input}
          placeholder='ΧΖΕ - 2439'
          onChangeText={setPlateNumber}
          value={plateNumber}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
      <CategoryPicker 
        selectedCategory={category}
        onCategoryChange={setCarBrand}
      />
      <Button onPress={handleSubmit} title='Προσθηκη νεου' color='blue' />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    position: 'absolute',
    backgroundColor: 'white', // Οποιοδήποτε χρώμα που επιθυμείτε
    top: -10, // Μετακίνηση του τίτλου πάνω από το border
    left: 10, // Αριστερή ευθυγράμμιση
    zIndex: 1, // Βεβαιωθείτε ότι ο τίτλος είναι εμφανής πάνω από το border
    paddingHorizontal: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 40,
  },
  input: {
    height: 50,
    top:10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom:20,
  },
});
