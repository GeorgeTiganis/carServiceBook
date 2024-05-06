import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addTodo';
import * as Font from 'expo-font';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

// Εδώ βάζουμε την γραμματοσειρά που θέλουμε
const getFonts = () => Font.loadAsync({
  'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
});

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffe', key: '1' },
    { text: 'create my app', key: '2' },
    { text: 'play on the switch', key: '3' }
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ];
      });
    } else {
      Alert.alert('Oops!', 'Ξαναπροσπαθήστε, έχετε εισάγει λανθασμένους χαρακτήρες', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home">
          {() => (
            <TouchableWithoutFeedback onPress={() => {
              Keyboard.dismiss();
              console.log('dismissed keyboard')
            }}>
              <View style={styles.container}>
                <Header />
                <View style={styles.content}>
                  <AddTodo submitHandler={submitHandler} />
                  <View style={styles.lists}>
                    <FlatList
                      data={todos}
                      renderItem={({ item }) => (
                        <TodoItem item={item} pressHandler={pressHandler} />
                      )}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>About Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  lists: {
    marginTop: 40,
  },
});
