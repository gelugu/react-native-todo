import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

export const AppButton = ({ children, onPress, style }) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Wrapper
      onPress={onPress}
      background={
        Platform.OS === "android"
          ? Platform.Version >= 21
            ? TouchableNativeFeedback.Ripple("rgba(0,0,0,.2)", true)
            : TouchableNativeFeedback.SelectableBackground()
          : null
      }
    >
      <View style={style}>
        <View>{children}</View>
      </View>
    </Wrapper>
  );
};
