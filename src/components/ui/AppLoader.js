import React from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { THEME } from "../../themes";

export const AppLoader = ({ style }) => (
  <View style={{ ...style }}>
    <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
  </View>
);
