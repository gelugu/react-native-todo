import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
} from "react-native";
import { THEME } from "../../../themes";

import { AppText } from "../../../ui/AppText";
import { AppButton } from "../../../ui/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { boardContext } from "../../../context/boardContext";

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
      : // : navigation.navigate("Task", { boardId, task });
        null;
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
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.configInput}
            />
            {title !== task.title ? (
              <AppButton onPress={renameHandler}>
                <MaterialIcons name="done" size={24} color={THEME.DARK_COLOR} />
              </AppButton>
            ) : null}
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
              <MaterialIcons
                name="check-box"
                size={24}
                color={THEME.DARK_COLOR}
              />
            ) : (
              <MaterialIcons
                name="check-box-outline-blank"
                size={24}
                color={THEME.DARK_COLOR}
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
    alignItems: "center",
    borderWidth: THEME.BORDER_WIDTH,
    borderColor: THEME.DARK_COLOR,
    borderRadius: 5,
    marginTop: 10,
  },
  configHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  configInput: {
    fontSize: THEME.FONT_SIZE,
    flex: 1,
    borderBottomWidth: THEME.BORDER_WIDTH,
    borderBottomColor: THEME.DARK_COLOR,
  },
  configButtons: {
    marginVertical: 10,  
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: THEME.DARK_COLOR,
    borderRadius: 5,
    marginTop: 10,
  },
  taskCheckBox: {},
  taskTitle: {
    fontSize: THEME.FONT_SIZE,
  },
});
