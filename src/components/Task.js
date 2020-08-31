import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  CheckBox,
} from "react-native";
import { THEME } from "../themes";

import { AppText } from "./ui/AppText";
import { taskContext } from "../context/task/taskContext";
import { screenContext } from "../context/screen/screenContext";

// Task element
//   task - current task
//   removeTask - method to remove current task
export const Task = ({ task }) => {
  const { removeTask } = useContext(taskContext);
  const { changeScreen } = useContext(screenContext);

  const longPressHandler = () => {
    // taskDone ? remove : editModal
    removeTask(task.id);
  };

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Wrapper
      style={styles.taskList}
      onLongPress={longPressHandler}
      onPress={changeScreen.bind(null, task.id)}
    >
      <View style={styles.task}>
        <CheckBox />
        <AppText style={styles.taskTitle}>{task.title}</AppText>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: THEME.GREY_COLOR,
    borderRadius: 5,
    marginTop: 10,
  },
  taskCheckBox: {},
  taskTitle: {
    fontSize: 16,
  },
});
