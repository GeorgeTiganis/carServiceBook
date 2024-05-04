import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , ScrollView, FlatList, TouchableOpacity} from 'react-native';
import React,{useState} from 'react'; 

export default function App() {
const [ people, setPeople] = useState([
 {name:'giorgos', id:'1'},
 {name:'mari', id:'2'},
 {name:'stelios', id:'3'},
 {name:'giannhs', id:'4'},
 {name:'periklhe', id:'5'},
 {name:'kaka', id:'6'},
 {name:'paidi', id:'7'},
]);


const pressHandler = (id) => {
  console.log(id);
  setPeople( (prpevPeople) =>  {
     return prpevPeople.filter(person =>  person.id != id) 
  });
}

  return (
    <View style={styles.container}>

      <FlatList
         
         keyExtractor={(item)=> item.id}
         data={ people }
         renderItem={({item})=>(
          <TouchableOpacity onPress={() => pressHandler(item.id)}>
              <Text style={styles.item}>  {item.name} </Text>
          </TouchableOpacity>
          
         )}
      />

      {/* <ScrollView>
      {people.map(item =>(
        (
          <View key={item.key}> 
            <Text style={styles.item}>
              {item.name}
            </Text>
          </View>
        )
      ))}
      </ScrollView> */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:40,
    paddingHorizontal:20,
    //alignItems: 'center',
   // justifyContent: 'center',
  },
 item:{
  marginTop:44,
  padding:30,
  backgroundColor:'pink',
  fontSize:34,
 }
});
