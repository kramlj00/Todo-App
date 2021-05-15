import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

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
    setTodos((prevTodos) => {
      return [
        { text: text, key:  Math.random().toString() }, // novi todo
        ...prevTodos // dohvaća sve prethodne todos
      ]
    })
  }

  return (
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
