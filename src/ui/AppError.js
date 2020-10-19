import React, { useContext } from "react";
import { View } from "react-native";
import { appContext } from "../context/contexts";
import { THEME } from "../themes";
import { Fade } from "./animations/Fade";
import { AppTextBold } from "./AppTextBold";

export const AppError = () => {
  const {error} = useContext(appContext)
  return <Fade style={THEME.LOADING} closeTriger={!error} duration={200}>
  <View>
    <AppTextBold>{error}</AppTextBold>
  </View>
</Fade>
};