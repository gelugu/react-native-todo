import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";

import { THEME } from "../../themes";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { AppButton } from "../../ui/AppButton";

import { boardContext } from "../../context/boardContext";

// task view and edit component
export const TaskLayout = ({navigation}) => {
  const { baordId, task } = navigation.state.params; // use getParam()
  const { removeTask, renameTask } = useContext(boardContext);

  // const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(task.title);

  // task save method
  const saveHandler = async () => {
    await renameTask(boardId, task.id, title)
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
        <AppButton onPress={removeTask.bind(null, baordId, task.id)}>
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

TaskLayout.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("task").title,
    headerRight: () => (
      <AppButton onPress={() => {}}>
        <MaterialIcons
          style={{ paddingRight: 10 }}
          name="more-horiz"
          size={40}
          color={THEME.MAIN_COLOR}
        />
      </AppButton>
    ),
  };
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
