import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput } from "react-native";

import { THEME } from "../themes";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { AppButton } from "../components/ui/AppButton";

import { taskContext } from "../context/task/taskContext";
import { screenContext } from "../context/screen/screenContext";

// task view and edit component
export const TaskLayout = () => {
  const { tasks, removeTask, updateTask } = useContext(taskContext);
  const { taskId, changeScreen } = useContext(screenContext);

  // const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(tasks.find((task) => task.id === taskId).title);

  // task save method
  const saveHandler = () => {
    updateTask(taskId, title);
  };

  return (
    <View style={styles.content}>
      <View style={styles.title}>
        <TextInput
          style={styles.inputTitle}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          defaultValue={title}
          onChangeText={setTitle}
          onSubmitEditing={saveHandler}
          maxLength={20} // set as SETTING.MAX_TITLE_LENGTH & push full input to "aboutTask"
          placeholder="Go sleep..." // placeholders array
          returnKeyType="done"
          selectTextOnFocus={true}
        />
      </View>

      <View style={styles.buttons}>
        <AppButton onPress={changeScreen.bind(null, null)}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </AppButton>
        <AppButton onPress={removeTask.bind(null, taskId)}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color={THEME.RED_COLOR}
          />
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: "96%",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  delete: {},
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: THEME.GREY_COLOR,
    borderRadius: 10,
    padding: 5,
  },
  inputTitle: {
    padding: 3,
    width: "100%",
  },
});
