import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React,{useState} from 'react'; 

export default function App() {
const [ name, setName] = useState('george',);
const [person, setPerson] = useState({name:'hghg' , age: 22});

const clickHandler = ()=>{
  setName('chun-li');
  setPerson({name:'giorgos',age:26})
}

  return (
    <View style={styles.container}>
      <Text>My name is{name}</Text>
     <Text>ΤΟ ΟΝΟΜΑ ΤΗΣ ΕΙΝΑΙ{person.name}και η ηλικεια τησ ειναι {person.age}</Text>
     <View style={styles.buttonConatiner}>
          <Button title='Add new car' onPress={clickHandler}/>
     </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonConatiner:{
    
  }
});
