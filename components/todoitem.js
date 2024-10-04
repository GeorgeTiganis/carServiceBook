// components/TodoItem.js

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function TodoItem({ item, pressHandler, isTrash = false }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = (key) => {
    setIsDeleting(true);
    Alert.alert(
      'Move to Trash',
      'Are you sure you want to move this todo to trash?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            setIsDeleting(false);
          },
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            playDeleteSound();
            pressHandler(key);
            setIsDeleting(false);
          }
        },
      ],
      { cancelable: false }
    );
  };

  const confirmPermanentDelete = (key) => {
    setIsDeleting(true);
    Alert.alert(
      'Permanent Delete',
      'Are you sure you want to permanently delete this todo?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            setIsDeleting(false);
          },
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            playDeleteSound();
            pressHandler(key);
            setIsDeleting(false);
          }
        },
      ],
      { cancelable: false }
    );
  };

  const playDeleteSound = async () => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/sound/delete.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  return (
    <View style={styles.item}>
      <View style={[styles.itemContent, isDeleting && { backgroundColor: 'red' }]}>
        {isTrash && (
          <TouchableOpacity onPress={() => confirmPermanentDelete(item.key)}>
            <MaterialIcons name='restore' size={25} color='#00cc00' />
          </TouchableOpacity>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.carBrand}</Text>
          <Text style={styles.itemCategory}>{item.plateNumber}</Text>
        </View>
        <TouchableOpacity onPress={() => isTrash ? confirmPermanentDelete(item.key) : confirmDelete(item.key)}>
          <MaterialIcons name='delete' size={25} color='#cc0000' />
        </TouchableOpacity>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemContent: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCategory: {
    fontSize: 14,
    color: '#888',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
