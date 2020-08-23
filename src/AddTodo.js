import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text, Alert } from "react-native";

// Form to push new task
export const AddTodo = ({ onSubmit }) => {
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
      <Button style={styles.button} title="Add" onPress={pressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    padding: 5,
    width: "70%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  button: {},
});
