import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AddTask } from "../components/AddTask"; // Form to add new task
import { Task } from "../components/Task"; // Task element

//  task list element
export const TaskListLayout = ({tasks, addTask, openTask}) => {
  
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={tasks}
          renderItem={({ item }) => {
            return <Task task={item} openTask={openTask}/>;
          }}
        />
        <AddTask style={styles.addTask} onSubmit={addTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "95%",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  addTask: {
    alignSelf: "flex-end",
  },
});
