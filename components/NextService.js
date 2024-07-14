// components/NextService.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const NextService = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState('');
  const [carName, setCarName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [serviceNotes, setServiceNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleSave = () => {
    if (details.length > 0 && carName.length > 0 && licensePlate.length > 0) {
      const newNote = {
        id: Math.random().toString(),
        date: date.toDateString(),
        details: details,
        carName: carName,
        licensePlate: licensePlate
      };
      setServiceNotes((prevNotes) => [newNote, ...prevNotes]);
      setDetails('');
      setCarName('');
      setLicensePlate('');
      setModalVisible(false);
      Alert.alert('Success', `Next service scheduled on ${date.toDateString()} with details: ${details}`);
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
        <Ionicons name="calendar-outline" size={40} color="black" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.label}>Schedule Next Service</Text>
            <Button onPress={showDatePicker} title="Pick Date" />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
            <Text style={styles.dateText}>{date.toDateString()}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter car name"
              onChangeText={setCarName}
              value={carName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter license plate"
              onChangeText={setLicensePlate}
              value={licensePlate}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter service details"
              onChangeText={setDetails}
              value={details}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
      <View style={styles.notesContainer}>
        {serviceNotes.map(note => (
          <View key={note.id} style={styles.note}>
            <Text style={styles.noteText}>Date: {note.date}</Text>
            <Text style={styles.noteText}>Car Name: {note.carName}</Text>
            <Text style={styles.noteText}>License Plate: {note.licensePlate}</Text>
            <Text style={styles.noteText}>Details: {note.details}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 20,
    width: 200,
  },
  notesContainer: {
    marginTop: 20,
  },
  note: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noteText: {
    fontSize: 16,
  },
});

export default NextService;
