import React from "react";
import { View, Text, StyleSheet } from "react-native";

// App header
export const Navbar = (props) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>ToDo app</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});
