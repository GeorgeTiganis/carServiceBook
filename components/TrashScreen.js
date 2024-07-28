// components/TrashScreen.js
import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LottieView from 'lottie-react-native'; // Ensure lottie-react-native is installed
import Header from './header';
import defaultImage from '../assets/default.png';
import restoreAnimation from '../assets/lottie/restore.json'; // Ensure the path is correct

export default function TrashScreen({ trash, permanentDeleteHandler, restoreHandler }) {
  const animationRef = useRef(null);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  const handleRestore = (key) => {
    setIsAnimationVisible(true);
    if (animationRef.current) {
      animationRef.current.play();
    }
    restoreHandler(key);
    setTimeout(() => {
      setIsAnimationVisible(false);
    }, 1000); // Adjust time as per the animation duration
  };

  const renderRightActions = (item) => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => handleRestore(item.key)} style={styles.restoreIconContainer}>
        <Icon name="restore" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => permanentDeleteHandler(item.key)} style={styles.deleteIconContainer}>
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
        {isAnimationVisible && (
          <LottieView
            ref={animationRef}
            source={restoreAnimation}
            autoPlay={false}
            loop={false}
            style={styles.lottie}
            onAnimationFinish={() => setIsAnimationVisible(false)}
          />
        )}
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  deleteIconContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  lottie: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 60,
  },
});
