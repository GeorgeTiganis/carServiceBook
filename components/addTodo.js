import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Animated, Text } from 'react-native';
import CategoryPicker from './CategoryPicker';

export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');
  const [isFocused, setIsFocused] = useState(false);
  const borderColorAnim = useRef(new Animated.Value(0)).current;

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

  const handleAddTodo = () => {
    submitHandler(text, category);
    setText('');
    setCategory('Personal');
  }

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
          placeholder='ΠΑΡ1234'
          onChangeText={changeHandler}
          value={text}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
      <CategoryPicker 
        selectedCategory={category}
        onCategoryChange={setCategory}
      />
      <Button onPress={handleAddTodo} title='add todo' color='coral' />
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
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom:20,
  },
});
