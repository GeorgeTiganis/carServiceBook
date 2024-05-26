// AddTodo.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import CategoryPicker from './CategoryPicker';

export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');

  const changeHandler = (val) => {
    setText(val);
  }

  const handleAddTodo = () => {
    submitHandler(text, category);
    setText('');
    setCategory('Personal');
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder='new todo...'
        onChangeText={changeHandler}
        value={text}
      />
      <CategoryPicker 
        selectedCategory={category}
        onCategoryChange={setCategory}
      />
      <Button onPress={handleAddTodo} title='add todo' color='coral' />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
