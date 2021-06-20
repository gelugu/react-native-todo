import React from "react";
import { StyleSheet, View } from "react-native";

import { colors, statusBarHeight } from "../styleConfig";

export const Wrapper = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
    paddingTop: statusBarHeight + 10,

    backgroundColor: colors.background
  },
});
