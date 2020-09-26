import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { AppText } from "./ui/AppText";
import { AppButton } from "./ui/AppButton";

import { boardContext } from "../context/board/boardContext";

import { THEME } from "../themes";

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
                  <MaterialIcons name="done" size={30} color="black" />
                </AppButton>
              ) : (
                <AppButton onPress={setIsConfig.bind(null, false)}>
                  <MaterialIcons
                    name="arrow-back"
                    size={30}
                    color={THEME.MAIN_COLOR}
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
                size={50}
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
                  size={40}
                  color={THEME.MAIN_COLOR}
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
                        size={12}
                        color={THEME.MAIN_COLOR}
                      />
                    ) : (
                      <MaterialIcons
                        name="radio-button-unchecked"
                        size={12}
                        color={THEME.MAIN_COLOR}
                      />
                    )}
                    <AppText style={{ marginLeft: 5 }}>{item.title}</AppText>
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

const size = Dimensions.get("window").width * 0.9;
const styles = StyleSheet.create({
  board: {
    width: size,
    height: size,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: THEME.BOARD_RADIUS,
    borderColor: THEME.MAIN_COLOR,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 11,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
  },
  list: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingTop: 11,
  },
  newTitle: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
    width: "80%",
    paddingTop: 5,
    marginRight: 10,
    fontSize: 18,
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
    fontSize: 18,
  },
});
