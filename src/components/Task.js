import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, CheckBox } from "react-native";
import { THEME } from "../themes";

// Task element
//   task - current task
//   removeTask - method to remove current task
export const Task = ({ task, editTask, openTask }) => {
  return (
    <TouchableOpacity
      style={styles.taskList}
      // onLongPress={editTask.bind(null, task.id)}
      onPress={openTask.bind(null, task.id)}
    >
      <View style={styles.task}>
        <CheckBox/>
        <Text style={styles.taskTitle}>{task.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskList: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: THEME.GREY_COLOR,
    borderRadius: 5,
    marginTop: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskCheckBox: {
    
  },
  taskTitle: {
    fontSize: 16
  }
});
