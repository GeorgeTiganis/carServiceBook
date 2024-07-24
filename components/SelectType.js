import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';

const SelectType = ({ isVisible, onClose, onSelect }) => {
  // Define the options array here
  const options = [
    { value: 'Τακτική συντήρηση', label: 'Τακτική συντήρηση' },
    { value: 'Μικρό Σέρβις', label: 'Μικρό Σερβις' },
    { value: 'Μεγάλο Σέρβις', label: 'Μεγάλο Σέρβις' },
    { value: 'Πλήρες Σέρβις', label: 'Πλήρες Σέρβις' },
    { value: 'Βλάβη', label: 'Βλάβη' },
    { value: 'ΚΤΕΟ', label: 'ΚΤΕΟ' },
    { value: 'Φανοποιία', label: 'Φανοποιία' },
    { value: 'Βελτίωση', label: 'Βελτίωση' },
    { value: 'Προσωπική εργασία', label: 'Προσωπική εργασία' },
    { value: 'Ηχοσύστημα', label: 'Ηχοσύστημα' },
    { value: 'Αλλο', label: 'Αλλο' },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onSelect(item.value)}
              >
                <Text style={styles.modalItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => (item.value ? item.value.toString() : index.toString())}  // Ensure unique key
          />
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={onClose}
          >
            <Text style={styles.modalCloseButtonText}>Κλείσιμο</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 18,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SelectType;
