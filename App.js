
import { StyleSheet, Text, View, FlatList, } from 'react-native';
import React,{useState} from 'react'; 
import Header from './components/header';
import TodoItem from './components/todoitem';

export default function App() {

const [todos,setTodos]= useState([
  {text:'buy coffe', key:'1'},
  {text:'create my app', key:'2'},
  {text:'play on the switch', key:'3'}
]);

const pressHandler = (key) => {
  setTodos((prevTodos)=> {
    return prevTodos.filter(todo => todo.key !=key );


  });
}

  return (
    <View style={styles.container}>
         <Header/>
         <View style={styles.content}> 
            {/**To form */}
            <View style={styles.lists}>
                 <FlatList
                    data={todos}
                    renderItem={({item}) => (
                     <TodoItem item={item} pressHandler={pressHandler} />

                    )}
                  />
            </View>
          </View>
      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  content:{
     padding:40,

  },
  lists:{
    marginTop:40,
  },
 
});
