import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addTodo';
import * as Font from 'expo-font';
import 'react-native-gesture-handler';
import CustomDrawerContent from './components/CustomDrawerContent';
import AllVehicles from './components/AllVehicles';  
import NextService from './components/NextService';
import HistoryService from './components/HistoryService';
import TrashScreen from './components/TrashScreen';
import Workshop from './components/Workshop';
import Application from './components/Application'; // Εισαγωγή του Application component

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

  const submitHandler = (text, category, navigation) => {
    if (text.length > 3) {
      setTodos((prevTodos) => [
        { text: text, key: Math.random().toString(), category: category },
        ...prevTodos
      ]);
      navigation.navigate('Ολα τα οχήματα');
    } else {
      Alert.alert('Oops!', 'Ξαναπροσπαθήστε, έχετε εισάγει λανθασμένους χαρακτήρες', [
        { text: 'Κατανοητό', onPress: () => console.log('alert closed') }
      ]);
    }
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Αρχική" drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Αρχική"
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        >
          {() => (
            <HomeScreen submitHandler={submitHandler} todos={todos} pressHandler={pressHandler} />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Σκουπίδια"
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="delete" size={size} color={color} />
            ),
          }}
        >
          {() => (
            <TrashScreen 
              trash={trash}
              permanentDeleteHandler={permanentDeleteHandler}
              restoreHandler={restoreHandler}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Η εφαρμογή"
          component={Application}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="apps" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Ολα τα οχήματα"
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="directions-car" size={size} color={color} />
            ),
          }}
        >
          {() => (
            <AllVehicles todos={todos} pressHandler={pressHandler} />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Συνεργείο"
          component={Workshop}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="build" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Επόμενο Service"
          component={NextService}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="next-week" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Ιστορικό Service"
          component={HistoryService}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="history" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ submitHandler, todos, pressHandler }) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={(text, category) => submitHandler(text, category, navigation)} />
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
