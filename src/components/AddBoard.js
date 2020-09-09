import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { THEME } from "../themes";
import { boardContext } from "../context/board/boardContext";
import { screenContext } from "../context/screen/screenContext";

// Form to push new task
export const AddBoard = () => {
  const {showAddBoard} = useContext(screenContext);

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper onPress={showAddBoard.bind(null, true)}>
        <View style={styles.block}>
          <MaterialIcons size={36} name="add" />
        </View>
    </Wrapper>
  );
};

const width = Dimensions.get("window").width * 0.9;
const styles = StyleSheet.create({
  block: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: width,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,

  },
});
