import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { THEME } from "../../themes";

import { userContext } from "../../context/contexts";
import { AuthContext } from "./AuthContext";

import { AppLoading } from "../../ui/AppLoading";
import { AppError } from "../../ui/AppError";
import { AuthHeader } from "./components/AuthHeader";
import { AuthInputLogin } from "./components/AuthInputLogin";
import { AuthInputPassword } from "./components/AuthInputPassword";
import { AuthInputPasswordConfirm } from "./components/AuthInputPasswordConfirm";
import { AuthButtons } from "./components/AuthButtons";
import { colors } from "../../styleConfig";

export const AuthLayout = ({ navigation }) => {
  const { user } = useContext(userContext);

  useEffect(() => {
    if (user) navigation.navigate("Boards");
  }, [user]);

  return (
    <AuthContext>
      <View style={styles.container}>
        <AppLoading />
        <AppError />
        <AuthHeader />
        <View style={styles.inputs}>
          <AuthInputLogin />
          <AuthInputPassword />
          <AuthInputPasswordConfirm />
        </View>
        <AuthButtons />
      </View>
    </AuthContext>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  inputs: {
    marginVertical: 15,
  },
});
