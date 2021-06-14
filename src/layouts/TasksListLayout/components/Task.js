import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
} from "react-native";

import { AppText } from "../../../ui/AppText";
import { AppButton } from "../../../ui/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { boardContext } from "../../../context/contexts";
import { colors, deviceWidth, fontSize, iconSize } from "../../../styleConfig";
// import { TaskConfig } from "./TaskConfig";

export const Task = ({ navigation, boardId, task }) => {
  const { boards, removeTask, renameTask, doneTask } = useContext(boardContext);

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
      : navigation.push("Tasks", { board: boards[0] });
    null;
  };

  const longPressHandler = () => {
    isConfig
      ? setIsConfig(false)
      : task.done
      ? removeHandler()
      : setIsConfig(true);
  };

  const onCheckboxTouch = () => {
    doneTask(boardId, task.id, !task.done)
  }

  return (
    <TouchableNativeFeedback
      onLongPress={longPressHandler}
      onPress={pressHandler}
    >
      {/* {isConfig && <TaskConfig />} */}
      <View style={styles.task}>
        <AppButton onPress={onCheckboxTouch}>
          <MaterialIcons
            name={task.done ? "check-box" : "check-box-outline-blank"}
            size={iconSize.small}
            color={colors.secondary}
          />
        </AppButton>
        <AppText style={styles.taskTitle}>{task.title}</AppText>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  task: {
    width: deviceWidth * 0.9,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,

    borderWidth: 0.3,
    borderColor: colors.secondary,
    borderRadius: 5,
  },
  taskCheckBox: {},
  taskTitle: {
    marginLeft: 5,
    fontSize: fontSize.regular,
  },
});
