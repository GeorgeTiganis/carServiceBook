import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, FlatList, Button } from 'react-native';

const MaintenanceItem = ({ title, value, onValueChange, editable }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{title}</Text>
    {editable ? (
      <Switch
        value={value}
        onValueChange={onValueChange}
      />
    ) : (
      <Text style={styles.switchText}>{value ? '✔️' : '❌'}</Text>
    )}
  </View>
);

const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([
    { id: '1', title: 'Συντήρηση - Υγρά', isHeader: true },
    { id: '2', title: 'Αλλαγή λαδιών', value: false },
    { id: '3', title: 'Αλλαγή paraflu ψυγείου κινητήρα', value: false },
    { id: '4', title: 'Αλλαγή freon a/c', value: false },
    { id: '5', title: 'Αλλαγή βαλβολίνων', value: true },
    { id: '6', title: 'Αλλαγή λαδιού εμπρός διαφορικού', value: false },
    { id: '7', title: 'Αλλαγή λαδιού πίσω διαφορικού', value: false },
    { id: '8', title: 'Αλλαγή υγρών φρένων', value: false },
    { id: '9', title: 'Αλλαγή υγρών υδραυλικού τιμονιού', value: false },
    { id: '10', title: 'Λίπανση ανάρτησης', value: false },
    { id: '11', title: 'Συντήρηση - Μηχανικά Μέρη', isHeader: true },
    { id: '12', title: 'Αλλαγή φίλτρου καυσίμου', value: false },
    { id: '13', title: 'Αλλαγή φίλτρου λαδιού', value: false },
    { id: '14', title: 'Αλλαγή φίλτρου μπουζί', value: false },
    { id: '15', title: 'Αλλαγή σετ ιμάντα χρονισμού', value: false },
    { id: '16', title: 'Αλλαγή φλάτζας βαλβίδων', value: false },
    { id: '17', title: 'Αλλαγή φίλτρου αέρα', value: false },
    { id: '18', title: 'Αλλαγή σετ συμπλέκτη', value: false },
    { id: '19', title: 'Αλλαγή κυλινδράκι συμπλέκτη', value: false },
    { id: '20', title: 'Αλλαγή μεταβλητού χρονισμού', value: false },
    { id: '21', title: 'Αλλαγή δίσκων φρένων (εμπρός)', value: false },
    { id: '22', title: 'Αλλαγή τακάκια (εμπρός)', value: false },
    { id: '23', title: 'Αλλαγή σωληνάκια φρένων (εμπρός)', value: false },
    { id: '24', title: 'Αλλαγή δίσκων φρένων (πίσω)', value: false },
    { id: '25', title: 'Αλλαγή τακάκια (πίσω)', value: false },
    { id: '26', title: 'Αλλαγή σωληνάκια (πίσω)', value: false },
    // Προσθέστε επιπλέον μηχανικά στοιχεία εδώ
  ]);

  const [editable, setEditable] = useState(true);
  const [savedData, setSavedData] = useState([]);
  const [showList, setShowList] = useState(true); // Κατάσταση για έλεγχο της εμφάνισης της λίστας

  const toggleSwitch = (id) => {
    setMaintenanceData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, value: !item.value } : item
      )
    );
  };

  const handleSave = () => {
    const activeItems = maintenanceData
      .filter(item => !item.isHeader && item.value)
      .map(item => item.title);
    setSavedData(activeItems);
    setEditable(false);
    setShowList(false); // Απόκρυψη της λίστας
  };

  const handleEdit = () => {
    setEditable(true);
    setShowList(true); // Εμφάνιση της λίστας
  };

  const renderItem = ({ item }) => {
    if (item.isHeader) {
      return <Text style={styles.sectionTitle}>{item.title}</Text>;
    }

    return (
      <MaintenanceItem
        title={item.title}
        value={item.value}
        onValueChange={() => toggleSwitch(item.id)}
        editable={editable}
      />
    );
  };

  return (
    <View style={styles.container}>
      {showList ? (
        <FlatList
          data={maintenanceData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.savedContainer}>
          <Text style={styles.savedText}>
            {savedData.length > 0 ? 'Αποθηκευμένα: ' + savedData.join(', ') : 'Δεν έχουν αποθηκευτεί δεδομένα.'}
          </Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        {editable ? (
          <>
            <Button title="Αποθήκευση" onPress={handleSave} />
           
          </>
        ) : (
          <Button title="Επεξεργασία" onPress={handleEdit} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:30,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    flex: 1, // Κάνει το κείμενο να καταλαμβάνει το υπόλοιπο χώρο
  },
  switchText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  savedContainer: {
    marginTop: 20,
  },
  savedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Maintenance;
