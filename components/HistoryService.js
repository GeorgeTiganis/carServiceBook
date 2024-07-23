import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  Animated,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectType from './SelectType';

export default function HistoryService({ todos, pressHandler }) {
  const [activeTab, setActiveTab] = useState('BasicInfo');
  const [selectedItems, setSelectedItems] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [basicInfo, setBasicInfo] = useState({ title: '', date: new Date(), serviceType: '' });
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState([
    'Τακτική Συντήρηση', // Εδώ είναι η νέα επιλογή
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
  ]);
  const [photo, setPhoto] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const titleLabelAnim = useRef(new Animated.Value(0)).current;
  const dateLabelAnim = useRef(new Animated.Value(0)).current;
  const serviceTypeLabelAnim = useRef(new Animated.Value(0)).current;

  const animateLabel = (animation, toValue) => {
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const toggleItem = (key) => {
    setSelectedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || basicInfo.date;
    setShowDatePicker(Platform.OS === 'ios');
    setBasicInfo({ ...basicInfo, date: currentDate });
    setIsDateSelected(true);
    animateLabel(dateLabelAnim, 1); // Animate the label when a date is selected
  };

  const handleServiceTypeSelection = (type) => {
    setBasicInfo({ ...basicInfo, serviceType: type });
    setIsModalVisible(false);
    animateLabel(serviceTypeLabelAnim, 1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'BasicInfo':
        return isEditing ? (
          <ScrollView>
            <View style={styles.inputContainer}>
              <Animated.Text
                style={[
                  styles.label,
                  {
                    top: titleLabelAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, -10],
                    }),
                    fontSize: titleLabelAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [16, 12],
                    }),
                    color: '#333', // Ensure the label is visible
                  },
                ]}
              >
                Όνομα Service
              </Animated.Text>
              <TextInput
                style={styles.input}
                placeholder="Τίτλος Service"
                placeholderTextColor="#999"
                value={basicInfo.title}
                onFocus={() => animateLabel(titleLabelAnim, 1)}
                onBlur={() => {
                  if (!basicInfo.title) {
                    animateLabel(titleLabelAnim, 0);
                  }
                }}
                onChangeText={(text) => setBasicInfo({ ...basicInfo, title: text })}
              />
              <Animated.View
                style={[
                  styles.underline,
                  {
                    transform: [
                      {
                        scaleX: titleLabelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
            <View style={styles.inputContainer}>
              <Animated.Text
                style={[
                  styles.label,
                  {
                    top: dateLabelAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, -10],
                    }),
                    fontSize: dateLabelAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [16, 12],
                    }),
                    color: '#333', // Ensure the label is visible
                  },
                ]}
              >
                Ημερομηνία
              </Animated.Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Ημερομηνία"
                  placeholderTextColor="#999"
                  value={isDateSelected ? basicInfo.date.toLocaleDateString() : ''}
                  editable={false}
                  onFocus={() => animateLabel(dateLabelAnim, 1)}
                  onBlur={() => {
                    if (!isDateSelected) {
                      animateLabel(dateLabelAnim, 0);
                    }
                  }}
                />
              </TouchableOpacity>
              <Animated.View
                style={[
                  styles.underline,
                  {
                    transform: [
                      {
                        scaleX: dateLabelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
            <View style={styles.inputContainer}>
              <Animated.Text
                style={[
                  styles.label,
                  {
                    top: serviceTypeLabelAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, -10],
                    }),
                    fontSize: serviceTypeLabelAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [16, 12],
                    }),
                    color: '#333', // Ensure the label is visible
                  },
                ]}
              >
                Επιλέξτε Τύπο Service
              </Animated.Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setIsModalVisible(true)}
              >
                <Text style={styles.placeholderText}>
                  {basicInfo.serviceType || 'Επιλέξτε Τύπο Service'}
                </Text>
              </TouchableOpacity>
              <Animated.View
                style={[
                  styles.underline,
                  {
                    transform: [
                      {
                        scaleX: serviceTypeLabelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={basicInfo.date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            {/* Add other fields similarly */}
          </ScrollView>
        ) : (
          <View>
            <Text>Τίτλος Service: {basicInfo.title}</Text>
            <Text>Ημερομηνία: {basicInfo.date.toLocaleDateString()}</Text>
            <Text>Τύπος Service: {basicInfo.serviceType}</Text>
            {/* Display other fields similarly */}
          </View>
        );
      case 'Maintenance':
        return (
          <FlatList
            data={maintenanceData}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => isEditing && toggleItem(index)}
              >
                <Text style={styles.toggleText}>
                  {selectedItems[index] ? '✓' : '⨯'} {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      case 'Photos':
        return (
          <View style={styles.photoContainer}>
            {photo && <Image source={{ uri: photo }} style={styles.photo} />}
            <TouchableOpacity onPress={openImagePicker} style={styles.uploadButton}>
              <Icon name="camera-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'Photos') {
      openImagePicker();
    }
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    setIsEditing(false);
    // Save logic here if needed
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'BasicInfo' && styles.activeTab]}
          onPress={() => handleTabPress('BasicInfo')}
        >
          <Icon name="information-circle-outline" size={20} color={activeTab === 'BasicInfo' ? '#007BFF' : '#000'} />
          <Text>Βασικές Πληροφορίες</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Maintenance' && styles.activeTab]}
          onPress={() => handleTabPress('Maintenance')}
        >
          <Icon name="build-outline" size={20} color={activeTab === 'Maintenance' ? '#007BFF' : '#000'} />
          <Text>Συντήρηση</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Photos' && styles.activeTab]}
          onPress={() => handleTabPress('Photos')}
        >
          <Icon name="camera-outline" size={20} color={activeTab === 'Photos' ? '#007BFF' : '#000'} />
          <Text>Φωτογραφία</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text>Επεξεργασία</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text>Αποθήκευση</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {renderTabContent()}
      </View>
      <SelectType
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleServiceTypeSelection}
        options={maintenanceData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  editButton: {
    padding: 10,
    backgroundColor: '#f0ad4e',
    borderRadius: 5,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#5cb85c',
    borderRadius: 5,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    zIndex: 1,
    paddingHorizontal: 5,
    color: '#333', // Ensure the label is visible
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  underline: {
    height: 2,
    backgroundColor: '#007BFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  placeholderText: {
    color: '#999',
    lineHeight: 50,
    textAlignVertical: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  toggleButton: {
    padding: 19,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  toggleText: {
    fontSize: 16,
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    top:500,
    backgroundColor: '#007BFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});
