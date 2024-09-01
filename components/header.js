import { StyleSheet, Image, View } from 'react-native';
import React from 'react';

export default function Header({ image }) {
    return (
        <View style={styles.header}>
            <Image
                source={image}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
