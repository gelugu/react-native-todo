import React from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";

import { THEME } from "../../../themes";

import { MaterialIcons } from "@expo/vector-icons";

export const AddBoard = ({ open }) => {

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper onPress={open}>
      <View style={styles.block}>
        <MaterialIcons size={36} name="add" color={THEME.DARK_COLOR}/>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  block: {
    alignItems: "center",
    justifyContent: "center",
    height: THEME.BOARD_SIZE,
    width: THEME.BOARD_SIZE,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: THEME.BOARD_RADIUS,
  },
});
