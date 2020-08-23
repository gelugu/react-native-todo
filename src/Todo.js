import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Task element
//   todo - current task
//   onRemove - method to remove current task
export const Todo = ({ todo, onRemove }) => {
  return (
    <TouchableOpacity onLongPress={onRemove.bind(null, todo.id)}>
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginTop: 10,
  },
});
