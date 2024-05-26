// CategoryPicker.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CategoryPicker({ selectedCategory, onCategoryChange }) {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => onCategoryChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Audi" value="Audi" />
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Audi" value="Audi" />
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Audi" value="Audi" />
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Shopping" value="Shopping" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
