import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { appContext } from "../context/contexts";
import { THEME } from "../themes";
import { Fade } from "./animations/Fade";

export const AppLoading = () => {
  const {loading} = useContext(appContext)
  return <Fade style={THEME.LOADING} closeTriger={!loading} duration={200}>
  <View>
    <ActivityIndicator size="large" color={THEME.LIGHT_COLOR} />
  </View>
</Fade>
};
