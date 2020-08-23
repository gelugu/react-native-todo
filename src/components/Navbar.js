import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../themes";

// App header
export const Navbar = (props) => {
  return (
    <View style={styles.navbar}>
      {/* <Text style={styles.text}>ToDo app</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 30,
    backgroundColor: THEME.MAIN_COLOR, 
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    color: THEME.TEXT_COLOR,
    fontSize: 26,
  },
});
