import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './header';

export default function HistoryService() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>History Service</Text>
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
    padding: 40,
  },
});
