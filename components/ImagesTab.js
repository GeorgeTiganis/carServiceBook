// ImagesTab.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ImagesTab() {
  const [photo, setPhoto] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImage = response.assets[0];
        setPhoto(selectedImage.uri);
        console.log('Image URI: ', selectedImage.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No Image Selected</Text>
      )}
      <TouchableOpacity onPress={openImagePicker} style={styles.imageButton}>
        <Text style={styles.imageButtonText}>Add Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noImageText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});
