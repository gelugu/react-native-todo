import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { THEME } from "../themes";

// App header
export const Navbar = () => {
  return <View style={styles.navbar} />;
};

const styles = StyleSheet.create({
  navbar: {
    height: (Dimensions.get("screen").height - Dimensions.get("window").height) || 30,  // 30 for ios ???
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});
