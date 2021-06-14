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
import { AppLoading } from "../../ui/AppLoading";
import { AppTextBold } from "../../ui/AppTextBold";
import { AppButton } from "../../ui/AppButton";
import { colors } from "../../styleConfig";

export const UserLayout = ({ navigation }) => {
  const { user, signOut } = useContext(userContext);

  const onBackTouch = () => {
    navigation.goBack();
  }

  const onExitTouch = () => {
    signOut();
  }

  return (
    <View style={styles.container}>
      <AppLoading />
      <AppError />
      <AppTextBold>{user.displayName}</AppTextBold>
      <AppButton onPress={onBackTouch}>
        <AppTextBold>Back</AppTextBold>
      </AppButton>
      <AppButton onPress={onExitTouch}>
        <AppTextBold>Exit</AppTextBold>
      </AppButton>
    </View>
  );
};

// header options
UserLayout.navigationOptions = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.background,
  },
});
