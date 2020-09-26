import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
} from "react-native";
import { THEME } from "../themes";

import { AppText } from "./ui/AppText";
import { AppButton } from "./ui/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { boardContext } from "../context/board/boardContext";

// Task element
//   task - current task
//   removeTask - method to remove current task
export const Task = ({ navigation, boardId, task }) => {
  const { removeTask, renameTask, doneTask } = useContext(boardContext);

  const [title, setTitle] = useState(task.title);
  const [isConfig, setIsConfig] = useState(false);

  const removeHandler = () => {
    removeTask(boardId, task.id);
  };

  const renameHandler = () => {
    renameTask(boardId, task.id, title);
    setIsConfig(false);
  };

  const pressHandler = () => {
    isConfig
      ? setIsConfig(false)
      // : navigation.navigate("Task", { boardId, task });
      : null
  };

  const longPressHandler = () => {
    isConfig
      ? setIsConfig(false)
      : task.done
      ? removeHandler()
      : setIsConfig(true);
  };

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Wrapper
      style={styles.taskList}
      onLongPress={longPressHandler}
      onPress={pressHandler}
    >
      {isConfig ? (
        <View style={styles.config}>
          <View style={styles.configHeader}>
            <TextInput value={title} onChangeText={setTitle} style={styles.configInput}/>
            <AppButton onPress={renameHandler}>
            <MaterialIcons
                name="done"
                size={24}
                color="black"
              />
            </AppButton>
          </View>
          <View style={styles.configButtons}>
            <AppButton onPress={removeHandler}>
              <AppText style={{ color: THEME.RED_COLOR }}>Delete</AppText>
            </AppButton>
            <AppButton
              onPress={() => {
                setTitle(task.title);
                setIsConfig(false);
              }}
            >
              <AppText>Back</AppText>
            </AppButton>
          </View>
        </View>
      ) : (
        <View style={styles.task}>
          <AppButton
            onPress={doneTask.bind(null, boardId, task.id, !task.done)}
          >
            {task.done ? (
              <MaterialIcons name="check-box" size={24} color="black" />
            ) : (
              <MaterialIcons
                name="check-box-outline-blank"
                size={24}
                color="black"
              />
            )}
          </AppButton>
          <AppText style={styles.taskTitle}>{task.title}</AppText>
        </View>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  config: {
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.GREY_COLOR,
    borderRadius: 5,
  },
  configHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  configInput: {
    fontSize: THEME.FONT_SIZE,
    width: "90%",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: THEME.GREY_COLOR,
  },
  configButtons: {

  },
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
