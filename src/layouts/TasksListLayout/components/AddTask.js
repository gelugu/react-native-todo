import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { AppButton } from "../../../ui/AppButton";
import { Fade } from "../../../ui/animations/Fade";
import { taskPlaceholders } from "../../../placeholders";
import { colors, deviceWidth, fontSize, iconSize } from "../../../styleConfig";

export const AddTask = ({ boardId, onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(boardId, value);
      setValue("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.block}>
      <AppButton style={styles.button} onPress={pressHandler}>
        <MaterialIcons
          size={iconSize.small}
          name="add"
          color={colors.primary}
        />
      </AppButton>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder={taskPlaceholders()}
        placeholderTextColor={colors.textOpacity}
        autoCorret={false}
        autoCapitalize="none"
        clearButtonMode="always"
        maxLength={30} // set as SETTING.MAX_TITLE_LENGTH
      />
      <Fade closeTriger={!value}>
        <AppButton style={styles.button} onPress={pressHandler}>
          <MaterialIcons
            size={iconSize.small}
            name="done"
            color={colors.primary}
          />
        </AppButton>
      </Fade>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    width: deviceWidth * 0.9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    fontSize: fontSize.regular,
    fontFamily: "CourierPrimeRegular",
    color: colors.text,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryOpacity,
  },
});
