import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { AppButton } from "../../../ui/AppButton";
// import { BoardConfig } from "./BoardConfig";
import { TaskList } from "./TaskList";

import { colors, deviceWidth, fontSize, iconSize } from "../../../styleConfig";
import { AppTextBold } from "../../../ui/AppTextBold";

export const Board = ({ board, openBoard }) => {
  const [isConfig, setIsConfig] = useState(false);

  const onBoardTouch = () => {
    if (isConfig) closeConfig();
    else openBoard(board);
  };

  const openConfig = () => {
    setIsConfig(true);
  };

  const closeConfig = () => {
    setIsConfig(true);
  };

  return (
    <TouchableNativeFeedback onPress={onBoardTouch} onLongPress={openConfig}>
      {/* {isConfig && <BoardConfig />} */}
      <View style={styles.board}>
        <View style={styles.header}>
          <AppTextBold style={styles.title}>{board.title}</AppTextBold>
          <AppButton onPress={openConfig}>
            <MaterialIcons
              name="more-horiz"
              size={36}
              color={colors.secondary}
            />
          </AppButton>
        </View>
        <TaskList tasks={board.tasks} />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  board: {
    width: deviceWidth * 0.9,
    height: deviceWidth * 0.9,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: fontSize.bold,
  },
});
