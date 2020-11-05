// react components
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  RefreshControl,
} from "react-native";


// context
import { userContext } from "../../context/contexts";

// style themes
import { THEME } from "../../themes";

// icons
import { MaterialIcons } from "@expo/vector-icons";
import { AppError } from "../../ui/AppError";
import {AppLoading} from "../../ui/AppLoading"
import { AppTextBold } from "../../ui/AppTextBold";

export const UserLayout = ({ navigation }) => {
  const { user } = useContext(userContext);

  return (
    <View style={styles.container}>
      <AppLoading />
      <AppError />

      <AppTextBold>{user.displayName}</AppTextBold>
    </View>
  );
};

// header options
UserLayout.navigationOptions = {};

const styles = StyleSheet.create({
  container: {
    ...THEME.HEADER,
    ...THEME.CONTAINER_CENTER,
  },
});
