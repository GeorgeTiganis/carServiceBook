// TodoItem.js
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';

export default function TodoItem({ item, pressHandler, restoreHandler, isTrash = false }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const animation = useRef(null);

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
            console.log('Cancel Pressed');
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
            console.log('Cancel Pressed');
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

  const confirmRestore = (key) => {
    Alert.alert(
      'Restore Item',
      'Are you sure you want to restore this todo?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => {
            setShowTick(true);
            animation.current.play();
            setTimeout(() => {
              restoreHandler(key);
              setShowTick(false);
            }, 1500); // Adjust the duration to match the length of your animation
          }
        }
      ],
      { cancelable: false }
    );
  };

  const playDeleteSound = async () => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/sound/delete.mp3'));
      await soundObject.playAsync();
      // Optionally unload the sound after playing
      // await soundObject.unloadAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  return (
    <View>
      {showTick && (
        <View style={styles.overlay}>
          <LottieView
            ref={animation}
            style={styles.animation}
            source={require('../assets/lottie/restore.json')}
            autoPlay={false}
            loop={false}
          />
        </View>
      )}
      <View style={[styles.item, isDeleting && { backgroundColor: 'red' }]}>
        {isTrash && (
          <TouchableOpacity onPress={() => confirmRestore(item.key)}>
            <MaterialIcons name='restore' size={25} color='#00cc00' />
          </TouchableOpacity>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.text}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
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
    padding: 16,
    marginTop: 16,
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
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

