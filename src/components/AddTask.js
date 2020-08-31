import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";

import { MaterialIcons } from '@expo/vector-icons';

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
        // caretHidden={caret}
        // onBlur={setCaret.bind(null, true)}
        // onEndEditing={setCaret.bind(null, false)}
      />
      <AppButton
        style={styles.button}
        onPress={pressHandler}>
          <MaterialIcons size={28} name="add"/>
        </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    padding: 5,
    width: "80%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: THEME.GREY_COLOR,
  },
  button: {
    backgroundColor: "transparent",
  },
});
