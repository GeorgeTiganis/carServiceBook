import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

const Application = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      <Image
        source={require('../assets/car.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>My Car Service 1.0.0</Text>
        <Text style={styles.paragraph}>
          Παρακολουθήστε το ιστορικό σέρβις όλων των αυτοκινήτων σας προσθέτοντας όλες τις υπηρεσίες συντήρησης και επισκευής. Δημιουργήστε ή επεξεργαστείτε τις εγγραφές σέρβις επιλέγοντας την ημερομηνία, τον τύπο του σέρβις, το συνολικό κόστος και όλες τις επιμέρους εργασίες επισκευής και συντήρησης με γρήγορο και απλό τρόπο.
          Προσθέστε όλα σας τα οχήματα και τα αγαπημένα σας συνεργεία επισκευής και αποθηκεύστε τα στην εφαρμογή.  </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default Application;
