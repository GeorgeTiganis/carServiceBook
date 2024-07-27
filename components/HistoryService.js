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
import ImagesTab from './ImagesTab'; // Import the new ImagesTab component

export default function HistoryService({ todos, pressHandler }) {
  const [activeTab, setActiveTab] = useState('BasicInfo');
  const [] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    title: '',
    date: new Date(),
    serviceType: '',
    mileage: '',
    cost: '',
    notes: '',
  });
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [maintenanceData] = useState([
    
  ]);
  const [photo, setPhoto] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const titleLabelAnim = useRef(new Animated.Value(0)).current;
  const dateLabelAnim = useRef(new Animated.Value(0)).current;
  const serviceTypeLabelAnim = useRef(new Animated.Value(0)).current;
  const mileageLabelAnim = useRef(new Animated.Value(0)).current;
  const costLabelAnim = useRef(new Animated.Value(0)).current;
  const notesLabelAnim = useRef(new Animated.Value(0)).current;

  const animateLabel = (animation, toValue) => {
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
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

  const onDateChange = (_event, selectedDate) => {
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

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    setIsEditing(false);
    // Perform save operation here
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'BasicInfo':
        return (
          <>
            {isEditing ? (
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
                    <Text >
                      {basicInfo.serviceType }
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
                <View style={styles.inputContainer}>
                  <Animated.Text
                    style={[
                      styles.label,
                      {
                        top: mileageLabelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, -10],
                        }),
                        fontSize: mileageLabelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [16, 12],
                        }),
                        color: '#333', // Ensure the label is visible
                      },
                    ]}
                  >
                    Διανυθέντα Χιλιόμετρα
                  </Animated.Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric" // Ensure the keyboard is numeric
                    value={basicInfo.mileage}
                    onFocus={() => animateLabel(mileageLabelAnim, 1)}
                    onBlur={() => {
                      if (!basicInfo.mileage) {
                        animateLabel(mileageLabelAnim, 0);
                      }
                    }}
                    onChangeText={(text) => setBasicInfo({ ...basicInfo, mileage: text })}
                  />
                  <Animated.View
                    style={[
                      styles.underline,
                      {
                        transform: [
                          {
                            scaleX: mileageLabelAnim.interpolate({
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
                        top: costLabelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, -10],
                        }),
                        fontSize: costLabelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [16, 12],
                        }),
                        color: '#333', // Ensure the label is visible
                      },
                    ]}
                  >
                    Κόστος
                  </Animated.Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric" // Ensure the keyboard is numeric
                    value={basicInfo.cost}
                    onFocus={() => animateLabel(costLabelAnim, 1)}
                    onBlur={() => {
                      if (!basicInfo.cost) {
                        animateLabel(costLabelAnim, 0);
                      }
                    }}
                    onChangeText={(text) => setBasicInfo({ ...basicInfo, cost: text })}
                  />
                  <Animated.View
                    style={[
                      styles.underline,
                      {
                        transform: [
                          {
                            scaleX: costLabelAnim.interpolate({
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
                        top: notesLabelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, -10],
                        }),
                        fontSize: notesLabelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [16, 12],
                        }),
                        color: '#333', // Ensure the label is visible
                      },
                    ]}
                  >
                    Σημειώσεις
                  </Animated.Text>
                  <TextInput
                    style={styles.textArea}
                    value={basicInfo.notes}
                    onFocus={() => animateLabel(notesLabelAnim, 1)}
                    onBlur={() => {
                      if (!basicInfo.notes) {
                        animateLabel(notesLabelAnim, 0);
                      }
                    }}
                    onChangeText={(text) => setBasicInfo({ ...basicInfo, notes: text })}
                    multiline={true}
                    numberOfLines={4}
                  />
                  <Animated.View
                    style={[
                      styles.underline,
                      {
                        transform: [
                          {
                            scaleX: notesLabelAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 1],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                  <Text style={styles.saveButtonText}>Αποθήκευση</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <>
                <Text style={styles.infoText}>Όνομα Service: {basicInfo.title}</Text>
                <Text style={styles.infoText}>
                  Ημερομηνία: {basicInfo.date.toLocaleDateString()}
                </Text>
                <Text style={styles.infoText}>Τύπος Service: {basicInfo.serviceType}</Text>
                <Text style={styles.infoText}>Διανυθέντα Χιλιόμετρα: {basicInfo.mileage}</Text>
                <Text style={styles.infoText}>Κόστος: {basicInfo.cost}</Text>
                <Text style={styles.infoText}>Σημειώσεις: {basicInfo.notes}</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                  <Text style={styles.editButtonText}>Επεξεργασία</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        );
      case 'maintenance':
        return (
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => pressHandler(item.key)}>
                <Text style={styles.item}>{item.text}</Text>
              </TouchableOpacity>
            )}
          />
        );
      case 'Images':
        return (
          <View style={styles.imageContainer}>
            {photo && <Image source={{ uri: photo }} style={styles.image} />}
            <TouchableOpacity onPress={openImagePicker} style={styles.imageButton}>
              <Text style={styles.imageButtonText}>Add Image</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'BasicInfo' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('BasicInfo')}
        >
          <Icon name="information-circle-outline" size={24} color="#FFF" />
          <Text style={styles.tabButtonText}>Basic Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'maintenance' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('maintenance')}
        >
          <Icon name="settings-outline" size={24} color="#FFF" />
          <Text style={styles.tabButtonText}>Maintenance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Images' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('Images')}
        >
          <Icon name="image-outline" size={24} color="#FFF" />
          <Text style={styles.tabButtonText}>Images</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>{renderTabContent()}</View>
      {showDatePicker && (
        <DateTimePicker
          value={basicInfo.date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      {isModalVisible && (
        <SelectType
          items={maintenanceData}
          onSelect={handleServiceTypeSelection}
          onCancel={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6200ee',
    paddingVertical: 10,
  },
  tabButton: {
    alignItems: 'center',
    padding: 10,
  },
  activeTabButton: {
    backgroundColor: '#3700b3',
    borderRadius: 20,
  },
  tabButtonText: {
    color: '#FFF',
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 35,
  },
  label: {
    position: 'absolute',
    left: 10,
    top: 20,
    color: '#777',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    height: 100,
    textAlignVertical: 'top',
  },
  underline: {
    height: 2,
    backgroundColor: '#6200ee',
    marginTop: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  item: {
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 16,
  },
  imageContainer: {
    alignItems: 'center',
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
  saveButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
