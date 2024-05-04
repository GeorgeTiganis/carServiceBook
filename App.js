import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , ScrollView} from 'react-native';
import React,{useState} from 'react'; 

export default function App() {
const [ people, setPeople] = useState([
 {name:'giorgos', key:'1'},
 {name:'mari', key:'2'},
 {name:'stelios', key:'3'},
 {name:'giannhs', key:'4'},
 {name:'periklhe', key:'5'},
 {name:'kaka', key:'6'},
 {name:'paidi', key:'7'},
]);




  return (
    <View style={styles.container}>
      <ScrollView>
      {people.map(item =>(
        (
          <View key={item.key}> 
            <Text style={styles.item}>
              {item.name}
            </Text>
          </View>
        )
      ))}
      </ScrollView>
     
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
