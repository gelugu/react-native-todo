import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../themes";

// App header
export const Navbar = (props) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>gelugu</Text>
      <Text style={styles.text}>to-to</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    marginLeft: 20,
    marginRight: 30, 
    height: 30,
    // backgroundColor: THEME.MAIN_COLOR,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: THEME.TEXT_COLOR,
    fontSize: 20,
  },
});
