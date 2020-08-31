import React from "react";
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, CheckBox } from "react-native";
import { THEME } from "../themes";

import {AppText} from "./ui/AppText"

// Task element
//   task - current task
//   removeTask - method to remove current task
export const Task = ({ task, editTask, openTask }) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Wrapper
      style={styles.taskList}
      // onLongPress={editTask.bind(null, task.id)}
      onPress={openTask.bind(null, task.id)}
    >
      <View style={styles.task}>
        <CheckBox/>
        <AppText style={styles.taskTitle}>{task.title}</AppText>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: THEME.GREY_COLOR,
    borderRadius: 5,
    marginTop: 10,
  },
  taskCheckBox: {
    
  },
  taskTitle: {
    fontSize: 16
  }
});
