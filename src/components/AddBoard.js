import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";

import { THEME } from "../themes";

import { MaterialIcons } from "@expo/vector-icons";

export const AddBoard = ({ open }) => {

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper onPress={open}>
      <View style={styles.block}>
        <MaterialIcons size={36} name="add" />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  block: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").width * 0.9,
    width: Dimensions.get("window").width * 0.9,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: THEME.BOARD_RADIUS,
  },
});
