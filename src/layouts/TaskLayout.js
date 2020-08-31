import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

import { THEME } from "../themes";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { ModalEdit } from "../components/ModalEdit";
import { AppButton } from "../components/ui/AppButton";

// task view and edit component
export const TaskLayout = ({ goBack, task, removeTask, onSave }) => {
  // hook for show/close modal edit
  const [modalEdit, setModalEdit] = useState(false);

  // task save method
  const saveHandler = (title) => {
    onSave(task.id, title);
    setModalEdit(false);
  };

  const [caret, setCaret] = useState(false);

  return (
    <View style={styles.content}>
      <View style={styles.title}>
        <TextInput
          style={styles.inputTitle}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          defaultValue={task.title}
          onChangeText={saveHandler}
          maxLength={20} // set as SETTING.MAX_TITLE_LENGTH
          caretHidden={caret}
          onBlur={setCaret.bind(null, true)}
          onEndEditing={setCaret.bind(null, false)}
          placeholder="Go sleep..." // placeholders array
          returnKeyType="done"
          selectTextOnFocus={true}
        />
      </View>

      <View style={styles.buttons}>
        <AppButton onPress={goBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </AppButton>
        <AppButton onPress={removeTask.bind(null, task.id)}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color={THEME.RED_COLOR}
          />
        </AppButton>
      </View>
      {/* <ModalEdit
        visible={modalEdit}
        setModalEdit={setModalEdit}
        value={task.title}
        onSave={saveHandler}
      /> */}
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
    padding: 5,
    width: "100%",
  },
});
