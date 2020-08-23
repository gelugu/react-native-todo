import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text, Alert } from "react-native";
import { THEME } from "../themes";

// Form to push new task
export const AddTask = ({ onSubmit }) => {
  // hook contains task title (value) and method to change title
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    } else {
      Alert.alert("Empty tas does not productive");
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
      />
      <Button style={styles.button} title="+" onPress={pressHandler} />
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
    width: "70%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: THEME.GREY_COLOR,
  },
  button: {
    borderRadius: 0,
  },
});
