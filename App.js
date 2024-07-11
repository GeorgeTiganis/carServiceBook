import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addTodo';
import * as Font from 'expo-font';
import 'react-native-gesture-handler';
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const getFonts = () => Font.loadAsync({
  'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
});

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1', category: 'Personal' },
    { text: 'create my app', key: '2', category: 'Work' },
    { text: 'play on the switch', key: '3', category: 'Personal' }
  ]);

  const [trash, setTrash] = useState([]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      const todoToMove = prevTodos.find(todo => todo.key === key);
      if (todoToMove) {
        setTrash((prevTrash) => [todoToMove, ...prevTrash]);
      }
      return prevTodos.filter(todo => todo.key !== key);
    });
  };

  const permanentDeleteHandler = (key) => {
    setTrash((prevTrash) => prevTrash.filter(todo => todo.key !== key));
  };

  const restoreHandler = (key) => {
    setTrash((prevTrash) => {
      const todoToRestore = prevTrash.find(todo => todo.key === key);
      if (todoToRestore) {
        setTodos((prevTodos) => [todoToRestore, ...prevTodos]);
      }
      return prevTrash.filter(todo => todo.key !== key);
    });
  };

  const submitHandler = (text, category) => {
    if (text.length > 3) {
      setTodos((prevTodos) => [
        { text: text, key: Math.random().toString(), category: category },
        ...prevTodos
      ]);
    } else {
      Alert.alert('Oops!', 'Ξαναπροσπαθήστε, έχετε εισάγει λανθασμένους χαρακτήρες', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home">
          {() => (
            <TouchableWithoutFeedback onPress={() => {
              Keyboard.dismiss();
              console.log('dismissed keyboard');
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
        <Drawer.Screen name="Trash">
          {() => (
            <View style={styles.container}>
              <Header />
              <View style={styles.content}>
                <Text>Trashed Items</Text>
                <View style={styles.lists}>
                  <FlatList
                    data={trash}
                    renderItem={({ item }) => (
                      <TodoItem item={item} pressHandler={permanentDeleteHandler} restoreHandler={restoreHandler} isTrash />
                    )}
                  />
                </View>
              </View>
            </View>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="All vehicles" component={AllVehicles} />
        <Drawer.Screen name="History" component={History} />
        <Drawer.Screen name="NextService" component={NextService} />
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

function AllVehicles() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>All vehicles</Text>
      </View>
    </View>
  );
}

function History() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>History</Text>
      </View>
    </View>
  );
}

function NextService() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>Next service</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cc0000',
  },
  content: {
    padding: 40,
  },
  lists: {
    marginTop: 40,
  },
});
