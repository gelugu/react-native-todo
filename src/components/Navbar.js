import React from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../themes";

import {AppText} from "./ui/AppText"

// App header
export const Navbar = (props) => {
  return (
    <View style={styles.navbar}>
      <AppText style={styles.text}>gelugu</AppText>
      <AppText style={styles.text}>to-to</AppText>
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
