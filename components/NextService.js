import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const NextService = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [details, setDetails] = useState('');
  const [carName, setCarName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [serviceNotes, setServiceNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleSave = () => {
    if (details.length > 0 && carName.length > 0 && licensePlate.length > 0) {
      const newNote = {
        id: Math.random().toString(),
        date: date.toISOString(),
        time: time.toISOString(),
        details: details,
        carName: carName,
        licensePlate: licensePlate
      };
      if (editNoteId) {
        setServiceNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === editNoteId
              ? { ...note, date: date.toISOString(), time: time.toISOString(), details, carName, licensePlate }
              : note
          )
        );
        setEditNoteId(null);
      } else {
        setServiceNotes((prevNotes) => [newNote, ...prevNotes]);
      }
      setDetails('');
      setCarName('');
      setLicensePlate('');
      setModalVisible(false);
      Alert.alert('Επιτυχής', `Το επόμενο service είναι ${date.toDateString()} στις ${time.toLocaleTimeString()} λεπτομέρειες: ${details}`);
    } else {
      Alert.alert('Πρόβλημα', 'Παρακαλώ συμπληρώστε όλα τα πεδία');
    }
  };

  const handleEdit = (id) => {
    const noteToEdit = serviceNotes.find(note => note.id === id);
    if (noteToEdit) {
      setDate(new Date(noteToEdit.date));
      setTime(new Date(noteToEdit.time));
      setDetails(noteToEdit.details);
      setCarName(noteToEdit.carName);
      setLicensePlate(noteToEdit.licensePlate);
      setEditNoteId(id);
      setModalVisible(true);
    }
  };

  const handleDelete = (id) => {
    setServiceNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  };

  const renderRightActions = (id) => {
    return (
      <TouchableOpacity onPress={() => handleDelete(id)} style={styles.deleteButton}>
        <Ionicons name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.label}>Επόμενο Service</Text>
            <Button onPress={() => setShowDatePicker(true)} title="Ημερομηνία" color="#007BFF" />
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <Text style={styles.dateText}>{date.toDateString()}</Text>
            <Button onPress={() => setShowTimePicker(true)} title="Ώρα service" color="#007BFF" />
            {showTimePicker && (
              <DateTimePicker
                testID="timePicker"
                value={time}
                mode="time"
                display="default"
                onChange={onChangeTime}
              />
            )}
            <Text style={styles.dateText}>{time.toLocaleTimeString()}</Text>
            <TextInput
              style={styles.input}
              placeholder="Όνομα αυτοκινήτου"
              onChangeText={setCarName}
              value={carName}
            />
            <TextInput
              style={styles.input}
              placeholder="Αριθμός πινακίδας"
              onChangeText={setLicensePlate}
              value={licensePlate}
            />
            <TextInput
              style={styles.input}
              placeholder="Λεπτομέρειες service"
              onChangeText={setDetails}
              value={details}
            />
            <View style={styles.buttonContainer}>
              <Button title="Αποθήκευση" onPress={handleSave} color="#28a745" />
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Ακύρωση</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.notesContainer}>
        {serviceNotes.map(note => (
          <Swipeable key={note.id} renderRightActions={() => renderRightActions(note.id)}>
            <TouchableOpacity onPress={() => handleEdit(note.id)}>
              <View style={styles.note}>
                <Text style={styles.noteText}>Ημερομηνία: {new Date(note.date).toDateString()}</Text>
                <Text style={styles.noteText}>Ώρα: {new Date(note.time).toLocaleTimeString()}</Text>
                <Text style={styles.noteText}>Όνομα αυτοκινήτου: {note.carName}</Text>
                <Text style={styles.noteText}>Αριθμός πινακίδας: {note.licensePlate}</Text>
                <Text style={styles.noteText}>Λεπτομέρειες: {note.details}</Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        ))}
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
        <Ionicons name="add-circle-outline" size={60} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  iconButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
  },
  dateText: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 18,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  notesContainer: {
    marginTop: 20,
  },
  note: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop:67,
  },
});

export default NextService;
