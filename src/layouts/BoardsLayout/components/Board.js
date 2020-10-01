import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { AppText } from "../../../ui/AppText";
import { AppButton } from "../../../ui/AppButton";

import { boardContext } from "../../../context/boardContext";

import { THEME } from "../../../themes";

import { MaterialIcons } from "@expo/vector-icons";

export const Board = ({ board, openBoard }) => {
  const { removeBoard, renameBoard } = useContext(boardContext);
  const [isConfig, setIsConfig] = useState(false);
  const togleIsConfig = () => {
    setIsConfig(!isConfig);
    setNewTitle(board.title);
  };

  const [newTitle, setNewTitle] = useState(board.title);

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper
      onPress={() => {
        isConfig ? togleIsConfig() : openBoard(board);
      }}
      onLongPress={togleIsConfig}
    >
      <View style={styles.board}>
        {isConfig ? (
          <View style={styles.container}>
            <View style={styles.input}>
              <TextInput
                value={newTitle}
                onChangeText={setNewTitle}
                style={styles.newTitle}
                maxLength={30}
              />
              {newTitle !== board.title ? (
                <AppButton onPress={renameBoard.bind(null, board.id, newTitle)}>
                  <MaterialIcons
                    name="done"
                    size={24}
                    color={THEME.DARK_COLOR}
                  />
                </AppButton>
              ) : (
                <AppButton onPress={setIsConfig.bind(null, false)}>
                  <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={THEME.DARK_COLOR}
                  />
                </AppButton>
              )}
            </View>
            <View style={styles.box}>
              <AppButton
                style={styles.button}
                onPress={openBoard.bind(null, board)}
              >
                <AppText style={styles.buttonText}>Open</AppText>
              </AppButton>
              <AppButton
                style={styles.button}
                onPress={removeBoard.bind(null, board.id)}
              >
                <AppText
                  style={{ ...styles.buttonText, color: THEME.RED_COLOR }}
                >
                  Delete
                </AppText>
              </AppButton>
              <AppButton
                style={styles.button}
                onPress={setIsConfig.bind(null, false)}
              >
                <AppText style={styles.buttonText}>Back</AppText>
              </AppButton>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.header}>
              <AppText style={styles.title}>{board.title}</AppText>
              <AppButton onPress={setIsConfig.bind(null, true)}>
                <MaterialIcons
                  name="more-horiz"
                  size={36}
                  color={THEME.DARK_COLOR}
                />
              </AppButton>
            </View>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={board.tasks}
              renderItem={({ item }) => {
                return (
                  <View style={styles.list}>
                    {item.done ? (
                      <MaterialIcons
                        name="radio-button-checked"
                        size={16}
                        color={THEME.DARK_COLOR}
                      />
                    ) : (
                      <MaterialIcons
                        name="radio-button-unchecked"
                        size={16}
                        color={THEME.DARK_COLOR}
                      />
                    )}
                    <AppText style={styles.task}>{item.title}</AppText>
                  </View>
                );
              }}
            />
          </View>
        )}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  board: {
    width: THEME.BOARD_SIZE,
    height: THEME.BOARD_SIZE,
    marginBottom: 10,
    borderWidth: THEME.BORDER_WIDTH,
    borderRadius: THEME.BOARD_RADIUS,
    borderColor: THEME.DARK_COLOR,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: THEME.FONT_SIZE_BOLD,
  },
  list: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  task: {
    fontSize: THEME.FONT_SIZE_SMALL,
    marginLeft: 5,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 11,
    paddingRight: 20,
  },
  newTitle: {
    borderBottomWidth: THEME.BORDER_WIDTH,
    borderBottomColor: THEME.DARK_COLOR,
    flex: 1,
    fontSize: THEME.FONT_SIZE_BOLD,
  },
  box: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: THEME.FONT_SIZE_BOLD,
  },
});
