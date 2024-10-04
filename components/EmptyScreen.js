import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // For the add icon

const EmptyScreen = ({ isListEmpty }) => {
  const navigation = useNavigation();
  const route = useRoute(); 
  const car = route.params?.item

  const [services, setServices] = useState([]);

  // Get new service from route params if available
  const newService = route.params?.newService;

  // Update services state if newService is provided
  useEffect(() => {
    if (newService) {
      setServices(prevServices => [...prevServices, newService]);
    }
  }, [newService]);

  const handleNavigate = () => {
    navigation.navigate('Ιστορικό Service');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.infoBox}>
      {/* Circle with number */}
      <View style={styles.circle}>
        <Text style={styles.circleText}>{index + 1}</Text>
      </View>

      {/* Basic Info label in top left */}
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Basic Info</Text>
      </View>
      
      {/* Service details */}
      <Text style={styles.infoTitle}>Όνομα Service:</Text>
      <Text style={styles.infoText}>{item.title}</Text>
      <Text style={styles.infoTitle}>Ημερομηνία:</Text>
      <Text style={styles.infoText}>{item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</Text>
      <Text style={styles.infoTitle}>Τύπος Service:</Text>
      <Text style={styles.infoText}>{item.serviceType}</Text>
      <Text style={styles.infoTitle}>Διανυθέντα Χιλιόμετρα:</Text>
      <Text style={styles.infoText}>{item.mileage}</Text>
      <Text style={styles.infoTitle}>Κόστος:</Text>
      <Text style={styles.infoText}>{item.cost}</Text>
      <Text style={styles.infoTitle}>Όχημα:</Text>
      <Text style={styles.infoText}>{item.vehicle}</Text>
      <Text style={styles.infoTitle}>Σημειώσεις:</Text>
      <Text style={styles.infoText}>{item.notes}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.infoTitle}>{`Μάρκα Αυτοκινήτου: ${car.carBrand}`}</Text>
      <Text style={styles.infoTitle}>{`Πινακίδα Αυτοκινήτου: ${car.plateNumber}`}</Text>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.noInfoText}>Δεν υπάρχουν διαθέσιμες πληροφορίες</Text>}
      />
      {/* Button to navigate */}
      {isListEmpty ? (
        <Button
          title="+ Προσθήκη (κενό)"
          onPress={handleNavigate}
        />
      ) : (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleNavigate}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  infoBox: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Adds shadow on Android
    marginBottom: 20,
    position: 'relative', // Ensure that the circle and label are positioned relative to the infoBox
  },
  circle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f4511e', // Color of the circle
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff', // Border color of the circle
  },
  circleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'blue', // Color for the Basic Info label
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  labelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    marginTop: 20, // Add margin to separate the label from the first title
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  noInfoText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#f4511e', // Color of the button
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Adds shadow on Android
  },
});

export default EmptyScreen;
