import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, ScrollView, FlatList, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For the gear and plus icons
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Header from './header'; // Include your Header component if needed
import image4 from '../assets/image4.jpeg';
import { Rating } from 'react-native-ratings'; // Import Rating component

export default function Workshop() {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
    rating: 0 // Add rating property
  });
  const [profiles, setProfiles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(null);

  const handleChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (editMode) {
      const updatedProfiles = [...profiles];
      updatedProfiles[currentProfileIndex] = {
        ...formData,
        title: formData.businessName,
        address: formData.address
      };
      setProfiles(updatedProfiles);
      setEditMode(false);
    } else {
      setProfiles([...profiles, { ...formData, title: formData.businessName, address: formData.address }]);
    }
    setModalVisible(false);
    setFormData({
      businessName: '',
      ownerName: '',
      address: '',
      phone: '',
      mobile: '',
      email: '',
      rating: 0 // Reset rating
    });
  };

  const handleEdit = (index) => {
    setFormData({
      businessName: profiles[index].title,
      ownerName: profiles[index].ownerName || '',
      address: profiles[index].address,
      phone: profiles[index].phone || '',
      mobile: profiles[index].mobile || '',
      email: profiles[index].email || '',
      rating: profiles[index].rating || 0 // Set rating if available
    });
    setCurrentProfileIndex(index);
    setModalVisible(true);
    setEditMode(true);
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this profile?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setProfiles(profiles.filter((_, i) => i !== index));
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleCall = (phone, mobile) => {
    const numberToCall = mobile ? mobile : phone; // Prefer mobile if available
    if (numberToCall) {
      Linking.openURL(`tel:${numberToCall}`);
    } else {
      Alert.alert('No phone number available', 'There is no phone number to call.');
    }
  };

  const renderRightActions = (index) => (
    <View style={styles.rightActionsContainer}>
      <TouchableOpacity
        style={styles.deleteIconContainer}
        onPress={() => handleDelete(index)}
      >
        <Icon name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderProfileItem = ({ item, index }) => (
    <Swipeable renderRightActions={() => renderRightActions(index)}>
      <TouchableOpacity style={styles.profileContainer} onPress={() => handleEdit(index)}>
        <View style={styles.iconContainer}>
          <Icon name="gear" size={30} color="#007BFF" />
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileTitle}>{item.title}</Text>
          <Text style={styles.profileAddress}>{item.address}</Text>
          <Rating
            type='star'
            ratingCount={5}
            imageSize={20}
            readonly
            startingValue={item.rating}
            style={styles.rating}
          />
        </View>
        <TouchableOpacity
          style={styles.phoneIconContainer}
          onPress={() => handleCall(item.phone, item.mobile)}
        >
          <Icon name="phone" size={30} color="#28a745" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Header image={image4}/>
      <View style={styles.content}>
        {profiles.length > 0 ? (
          <FlatList
            data={profiles}
            renderItem={renderProfileItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>Δεν υπάρχει συνεργείο</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
          setEditMode(false);
        }}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              <Text style={styles.modalTitle}>{editMode ? 'Edit Workshop Profile' : 'Δημιουργία συνεργείου'}</Text>

              <TextInput
                style={styles.input}
                placeholder="Όνομα επιχείρησης"
                value={formData.businessName}
                onChangeText={(text) => handleChange('businessName', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Όνομα ιδιοκτήτη"
                value={formData.ownerName}
                onChangeText={(text) => handleChange('ownerName', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Διεύθυνση"
                value={formData.address}
                onChangeText={(text) => handleChange('address', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Τηλέφωνο"
                value={formData.phone}
                onChangeText={(text) => handleChange('phone', text)}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Κινητό"
                value={formData.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
              />
              <Rating
                type='star'
                ratingCount={5}
                imageSize={30}
                startingValue={formData.rating}
                onFinishRating={(rating) => handleChange('rating', rating)}
                style={styles.rating}
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>{editMode ? 'Ενημέρωση' : 'Αποθήκευση'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Ακύρωση</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20, // Adjusted padding for better layout
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20, // Increased padding for better appearance
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    height: 160, // Increased height to accommodate the rating
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTextContainer: {
    flex: 1,
    
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft:10,
  },
  profileAddress: {
    fontSize: 14,
    color: '#666',
    marginLeft:10,
  },
  rating: {
    alignSelf: 'flex-start',
    marginVertical: 10,
    top:20,
    marginLeft:10,
  },
  phoneIconContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  deleteIconContainer: {
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    height:600,
  },
  modalScrollContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    top:30,
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    top:30,
    
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
