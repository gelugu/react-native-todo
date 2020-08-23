import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { Navbar } from "./src/Navbar"; //App header element
import { AddTodo } from "./src/AddTodo"; // Form to add new task
import { Todo } from "./src/Todo"; // Task element

//  main app element
export default function App() {
  // hook contain tasks array and method to change this array
  const [todos, setTodos] = useState([]);
  // method to add new task
  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev, // get current tasks array
      // push new task in back
      {
        id: Date.now().toString(),
        title,
      },
    ]);
  };
  // methid to remove task by 'id'
  const removeTask = (id) => {
    setTodos((prev) => prev.filter((taks) => taks.id !== id));
  };

  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={todos}
          renderItem={({ item }) => {
            return <Todo onRemove={removeTask} todo={item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
