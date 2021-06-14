import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { AppButton } from "../../../ui/AppButton";
import { Fade } from "../../../ui/animations/Fade";
import { colors, iconSize } from "../../../styleConfig";

export const Menu = () => {
  const [open, setOpen] = useState(false)

  const openMenu = () => {
    setOpen(true)
  }

  return (
    <View style={styles.container}>
      <Fade closeTriger={open}>
      <AppButton onPress={openMenu}>
        <Entypo name="menu" size={iconSize.large} color={colors.primary} />
      </AppButton></Fade>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});
