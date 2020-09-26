import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { AppButton } from "./ui/AppButton";
import { THEME } from "../themes";

// Form to push new task
export const AddTask = ({ boardId, onSubmit }) => {
  // hook contains task title (value) and method to change title
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(boardId, value);
      setValue("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.block}>
    <AppButton style={styles.button} onPress={pressHandler}>
      <MaterialIcons size={24} name="add" />
    </AppButton>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Input task..."
        autoCorret={false}
        autoCapitalize="none"
        clearButtonMode="always"
        maxLength={30} // set as SETTING.MAX_TITLE_LENGTH
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: THEME.GREY_COLOR,
  },
});
