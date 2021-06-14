import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { AppText } from "../../../ui/AppText";
import { colors, fontSize } from "../../../styleConfig";

export const Task = ({ item }) => {
  return (
    <View style={styles.task}>
      <MaterialIcons
        name={item.done ? "radio-button-checked" : "radio-button-unchecked"}
        size={16}
        color={colors.secondary}
      />
      <AppText style={styles.taskTitle}>{item.title}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  taskTitle: {
    fontSize: fontSize.small,
    marginLeft: 5,
  },
});
