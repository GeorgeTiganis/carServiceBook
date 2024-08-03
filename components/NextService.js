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
  const [editNoteId, setEditNoteId] = useState(null);

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
      if (editNoteId) {
        setServiceNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === editNoteId
              ? { ...note, date: date.toDateString(), details, carName, licensePlate }
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
      Alert.alert('Επιτυχής', `Το επόμενομ service είναι ${date.toDateString()} λεπτομέρειε;: ${details}`);
    } else {
      Alert.alert('Πρόβλημα', 'Παρακαλώ συμπληρώστε όλα τα πεδία');
    }
  };

  const handleEdit = (id) => {
    const noteToEdit = serviceNotes.find(note => note.id === id);
    if (noteToEdit) {
      setDate(new Date(noteToEdit.date));
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
            <Button onPress={showDatePicker} title="Ημερομηνια" color="#007BFF" />
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
              placeholder="Ονομα αυτοκινήτου"
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
              <Button title={editNoteId ? "Αποθήκευση" : "Αποθήκευση"} onPress={handleSave} color="#28a745" />
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Ακύρωση</Text>
              </TouchableOpacity>
            </View>
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
            <View style={styles.noteActions}>
              <TouchableOpacity onPress={() => handleEdit(note.id)} style={styles.editButton}>
                <Ionicons name="pencil" size={24} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(note.id)} style={styles.deleteButton}>
                <Ionicons name="trash" size={24} color="#dc3545" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
        <Ionicons name="add-circle-outline" size={60} color="#007BFF" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'transparent',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 18,
    marginVertical: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
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
    paddingHorizontal: 15,
  },
  note: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noteText: {
    fontSize: 16,
    color: '#333',
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {},
});

export default NextService;
