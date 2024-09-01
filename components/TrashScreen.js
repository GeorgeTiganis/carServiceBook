// components/TrashScreen.js

import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av'; // Import Audio from expo-av
import Header from './header';
import defaultImage from '../assets/default.png';
import restoreAnimation from '../assets/lottie/restore.json';

export default function TrashScreen({ trash, permanentDeleteHandler, restoreHandler }) {
  const animationRef = useRef(null);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  // Function to play the delete sound
  async function playDeleteSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../assets/sound/delete.mp3'));
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  // Function to handle restoration of a todo item
  const confirmRestore = (key) => {
    Alert.alert(
      'Restore Item',
      'Are you sure you want to restore this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: () => handleRestore(key) 
        }
      ],
      { cancelable: false }
    );
  };

  const handleRestore = (key) => {
    setIsAnimationVisible(true);
    if (animationRef.current) {
      animationRef.current.play();
    }
    restoreHandler(key);
    setTimeout(() => {
      setIsAnimationVisible(false);
    }, 2000); // Show the animation for 2 seconds
  };

  // Confirm before deleting an item
  const confirmDelete = (key) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: async () => {
            await playDeleteSound();
            permanentDeleteHandler(key);
          } 
        },
      ],
      { cancelable: false }
    );
  };

  const renderRightActions = (item) => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => confirmRestore(item.key)} style={styles.restoreIconContainer}>
        <Icon name="restore" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmDelete(item.key)} style={styles.deleteIconContainer}>
        <Icon name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <FlatList
          data={trash}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item)}>
              <View style={styles.card}>
                <Image
                  style={styles.image}
                  source={item.imageUrl ? { uri: item.imageUrl } : defaultImage}
                />
                <View style={styles.details}>
                  <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          )}
          keyExtractor={(item) => item.key.toString()}
          contentContainerStyle={styles.listContainer}
        />
        
      </View>
      {isAnimationVisible && (
          <LottieView
            ref={animationRef}
            source={restoreAnimation}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        )}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 150,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCategory: {
    fontSize: 14,
    color: '#999',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  restoreIconContainer: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height:60,
    borderRadius: 30,
    top:20,
    marginRight:5,
  },
  deleteIconContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height:60,
    borderRadius: 30,
    top: 20,
    marginRight:5,
  },
  lottie: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 60,
    backgroundColor: 'rgba(255, 255, 255, 0)', // Διαφανές background για καλύτερη ορατότητα
  },
});
