import React from "react";
import { StyleSheet, View } from "react-native";
import { THEME } from "../../../themes";
import { AppButton } from "../../../ui/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export const ButtonRow = ({ navigation }) => {
  return (
    <View style={styles.row}>
      <AppButton onPress={navigation.navigate.bind(null, "User")}>
        <FontAwesome5
          name="user-alt"
          size={THEME.ICON_MEDIUM}
          color={THEME.GREY_COLOR}
        />
      </AppButton>
      <AppButton
        onPress={navigation.navigate.bind(null, "AddBoard")}
        style={styles.addButton}
      >
        <MaterialIcons
          name="add-box"
          size={THEME.ICON_LARGE}
          color={THEME.GREY_COLOR}
        />
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: (THEME.APP_WIDTH - THEME.BOARD.width) / 2,
    width: THEME.APP_WIDTH,

    backgroundColor: THEME.DARK_COLOR,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
