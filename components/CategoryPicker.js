import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CategoryPicker() {
  const [selectedCategory, setSelectedCategory] = useState('Audi');

  const onCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const categories = [
    { label: 'Audi', value: 'Audi', icon: 'car' },
    { label: 'Work', value: 'Work', icon: 'briefcase' },
    { label: 'Shopping', value: 'Shopping', icon: 'shopping-cart' },
  ];

  const pickerItems = categories.map((category) => ({
    label: category.label,
    value: category.value,
    key: category.value,
    icon: () => <Icon name={category.icon} size={20} color="#900" style={styles.icon} />,
  }));

  return (
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        onValueChange={(value) => onCategoryChange(value)}
        items={pickerItems}
        style={{
          inputIOS: styles.picker,
          inputAndroid: styles.picker,
          iconContainer: styles.iconContainer,
        }}
        value={selectedCategory}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          const selectedIcon = categories.find(cat => cat.value === selectedCategory)?.icon;
          return selectedIcon ? <Icon name={selectedIcon} size={20} color="#900" /> : null;
        }}
      />
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
  iconContainer: {
    top: 10,
    right: 12,
  },
  icon: {
    marginRight: 10,
  },
});
