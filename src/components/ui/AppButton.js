import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

export const AppButton = ({ children, onPress, style }) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={style}>
      <Wrapper onPress={onPress}>
        <View>{children}</View>
      </Wrapper>
    </View>
  );
};
