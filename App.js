import React, {useState} from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from './components/header'
import TodoItem from './components/todoItem'
import AddTodo from './components/addTodo'

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1' },
    { text: 'create an app', key: '2' },
    { text: 'play on the switch', key: '3' }
  ])

  //funkcija pressHandler će se proslijedit kao prop u TodoItem komponentu
  //klikom na neki todo brišemo ga
  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todos => todos.key != key); /*prevTodos sadrži sve todos osim onog s tenutnim key*/
    })
  } 

  const submitHandler = (text) => {

    if(text.length > 0) {
      setTodos((prevTodos) => {
        return [
          { text: text, key:  Math.random().toString() }, // novi todo
          ...prevTodos // dohvaća sve prethodne todos
        ]
      })
    } else {
      Alert.alert('OOPS!', 'Todo must be over 0 characters long', [
        {text: 'Understood', onPress: () => console.log('alert closed')}
      ]);
    }
  }

  return (
    <TouchableWithoutFeedback onPress = {() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <View style={styles.container}>
        <Header/>
        <View style = {styles.content}>
          <AddTodo submitHandler={submitHandler}/>
          <View style = {styles.list}>
            <FlatList
              data = {todos}
              renderItem = {({item}) => (
                <TodoItem item={item} pressHandler={pressHandler}/>
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
  list: {
    marginTop: 20,
  }
});
