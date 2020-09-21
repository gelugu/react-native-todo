import React from "react";
import { View, ActivityIndicator } from "react-native";
import { THEME } from "../../themes";

export const AppLoader = ({ style }) => (
  <View style={{ ...style }}>
    <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
  </View>
);
