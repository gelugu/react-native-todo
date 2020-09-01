import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";

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
  const [title, setTitle] = useState(
    tasks.find((task) => task.id === taskId).title
  );

  // task save method
  const saveHandler = async () => {
    await updateTask(taskId, title);
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
          <MaterialIcons name="arrow-back" size={30} color={THEME.MAIN_COLOR} />
        </AppButton>
        <AppButton onPress={removeTask.bind(null, taskId)}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={30}
            color={THEME.RED_COLOR}
          />
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: Dimensions.get("window").height,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputTitle: {
    borderWidth: 1,
    borderColor: THEME.GREY_COLOR,
    borderRadius: 5,
    fontSize: 16,
    padding: 5,
    width: "100%",
  }
});
