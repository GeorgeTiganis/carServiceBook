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
    { id: '5', title: 'Αλλαγή βαλβολίνων', value: false },
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
    { id: '26', title: 'Αλλαγή σωληνάκια φρένων (πίσω)', value: false },
    { id: '27', title: 'Συντήρηση - Ανάρτηση', isHeader: true },
    { id: '28', title: 'Αλλαγή άνω εμπρός ψαλίδι', value: false },
    { id: '29', title: 'Αλλαγή κάτω εμπρός ψαλίδι', value: false },
    { id: '30', title: 'Αλλαγή άνω πίσω ψαλίδι', value: false },
    { id: '31', title: 'Αλλαγή κάτω πίσω ψαλίδι', value: false },
    { id: '32', title: 'Αλλαγή πίσω εγκάρσιος βραχίονας', value: false },
    { id: '33', title: 'Αλλαγή εμπρός top mount', value: false },
    { id: '34', title: 'Αλλαγή πίσω top mount', value: false },
    { id: '35', title: 'Αλλαγή εμπρός ντλιζα αντιστρεπτικής', value: false },
    { id: '36', title: 'Αλλαγή εμπρός αντιστρεπτικής', value: false },
    { id: '37', title: 'Αλλαγή πίσω αντιστρεπτικής', value: false },
    { id: '38', title: 'Αλλαγή λάστιχα ζαμφόρ', value: false },
    { id: '39', title: 'Αλλαγή εμπρός αμορτισέρ', value: false },
    { id: '40', title: 'Αλλαγή πίσω αμορτισέρ', value: false },
    { id: '41', title: 'Αλλαγή ελατηρίων ανάρτησης', value: false },
    { id: '42', title: 'Συντήρηση -  Ηλεκτρολογικά', isHeader: true },
    { id: '43', title: 'Αλλαγή αισθητήρα μάζας αέρα', value: false },
    { id: '44', title: 'Αλλαγή αισθητήρα λάμδα προκαταλύτη', value: false },
    { id: '45', title: 'Αλλαγή αισθητήρα λάμδα καταλύτη', value: false },
    { id: '46', title: 'Αλλαγή αισθητήρα στροφάλου', value: false },
    { id: '47', title: 'Αλλαγή μπουζοκαλώδια', value: false },
    { id: '48', title: 'Αλλαγή πολλαπλασιαστή', value: false },
    { id: '49', title: 'Αλλαγή αντλίας καυσίμου', value: false },
    { id: '50', title: 'Αλλαγή μονάδας ABS', value: false },
    { id: '51', title: 'Αλλαγή ECU', value: false },
    { id: '52', title: 'Αλλαγή μπαταρίας ', value: false },
    { id: '53', title: 'Αλλαγή δυναμό', value: false },
    { id: '54', title: 'Επισκευή δυναμό', value: false },
    { id: '55', title: 'Συντήρηση - Λοιπά περιφερειακά', isHeader: true },
    { id: '56', title: 'Αλλαγή φίλτρου καμπίνας', value: false },
    { id: '57', title: 'Αλλαγή εμπρός λαμπτήρων', value: false },
    { id: '58', title: 'Αλλαγή λαμπτήρων φλάς', value: false },
    { id: '59', title: 'Αλλαγή λαμπτήρων ομίχλης', value: false },
    { id: '60', title: 'Αλλαγή εμπρός υαλοκαθαριστήρων', value: false },
    { id: '61', title: 'Αλλαγή πίσω υαλοκαθαριστήρων', value: false },
    { id: '62', title: 'Αλλαγή ελαστικών', value: false },
    { id: '63', title: 'Αλλαγή εμπρός διακόπτη παραθύρων', value: false },
    { id: '64', title: 'Αλλαγή πίσω διακόπτη παραθύρων', value: false },
    { id: '65', title: 'Αλλαγή εμπρός γρύλου παραθύρων', value: false },
    { id: '66', title: 'Επισκευή πίσω γρύλου παραθύρων', value: false },
    { id: '67', title: 'Αλλαγή λάστιχα στήριξης εξάτμισης', value: false },
   



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
