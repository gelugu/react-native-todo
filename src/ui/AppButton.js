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
    <Wrapper onPress={onPress}>
      <View style={style}>
        <View>{children}</View>
      </View>
    </Wrapper>
  );
};
