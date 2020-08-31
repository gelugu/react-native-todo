import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { AppButton } from "./ui/AppButton";
import { THEME } from "../themes";

// Form to push new task
export const AddTask = ({ onSubmit }) => {
  // hook contains task title (value) and method to change title
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Input task..."
        autoCorret={false}
        autoCapitalize="none"
        clearButtonMode="always"
        maxLength={20} // set as SETTING.MAX_TITLE_LENGTH
      />
      <AppButton style={styles.button} onPress={pressHandler}>
        <MaterialIcons size={30} name="add" />
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    fontSize: 20,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: THEME.GREY_COLOR,
  },
});
