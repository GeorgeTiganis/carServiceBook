// components/AllVehicles.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from './header';
import TodoItem from './todoitem';

export default function AllVehicles({ todos, pressHandler }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>All Vehicles</Text>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem item={item} pressHandler={pressHandler} />
          )}
          numColumns={2} // Display 2 items per row
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  listContainer: {
    justifyContent: 'space-between',
  },
});
