import { StyleSheet, Text, Animated, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpg'; // Adjust the path based on your project structure

export default function Header() {
    const images = [image1, image2, image3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(3)).current;

    useEffect(() => {
        const intervalId = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
            });
        }, 3000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, [fadeAnim]);

    return (
        <View style={styles.header}>
            <Animated.Image
                source={images[currentImageIndex]}
                style={[styles.image, { opacity: fadeAnim }]}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 200,
        justifyContent: 'center', // Centers the text vertically
        alignItems: 'center',     // Centers the text horizontally
        position: 'relative',
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    
});
