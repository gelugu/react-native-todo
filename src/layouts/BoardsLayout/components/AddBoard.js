import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";

import { AppButton } from "../../../ui/AppButton";
import { AppText } from "../../../ui/AppText";
import { boardContext } from "../../../context/contexts";
import { taskPlaceholders, boardPlaceholders } from "../../../placeholders";

import { THEME } from "../../../themes";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export const AddBoard = ({ navigation }) => {
  const { addBoard } = useContext(boardContext);

  const [taskList, setTaskList] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [boardTitle, setBoardTitle] = useState("");

  let newTaskRef = useRef(null);

  const handleDone = () => {
    newTaskRef = null;
    if (boardTitle) addBoard(boardTitle, taskList);
    handlerClose();
  };

  const handleAddTask = () => {
    if (currentTitle) {
      setTaskList([...taskList, currentTitle]);
      setCurrentTitle("");
      newTaskRef.focus();
    }
  };

  const handlerClose = () => {
    setBoardTitle("");
    setCurrentTitle("");
    setTaskList([]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.header}>
          <TextInput
            value={boardTitle}
            style={styles.title}
            autoFocus={true}
            onChangeText={setBoardTitle}
            onSubmitEditing={() => {
              newTaskRef.focus();
            }}
            clearButtonMode={"while-editing"}
            placeholder={boardPlaceholders()}
            maxLength={30}
          />
          {boardTitle ? (
            <AppButton onPress={handleDone}>
              <MaterialIcons name="done" size={24} color={THEME.DARK_COLOR} />
            </AppButton>
          ) : null}
        </View>
        <View style={styles.list}>
          <FlatList
            keyExtractor={(item) => item}
            data={taskList}
            renderItem={({ item }) => {
              return (
                <View style={styles.taskRow}>
                  <Entypo
                    name="dot-single"
                    size={24}
                    color={THEME.DARK_COLOR}
                  />
                  <AppText>{item}</AppText>
                </View>
              );
            }}
            ListFooterComponent={
              <View style={styles.addTaskRow}>
                <AppButton>
                  <MaterialIcons
                    name="add"
                    size={24}
                    color={THEME.DARK_COLOR}
                  />
                </AppButton>
                <TextInput
                  value={currentTitle}
                  style={styles.addTask}
                  onChangeText={setCurrentTitle}
                  onEndEditing={handleAddTask}
                  placeholder={taskPlaceholders()}
                  // blurOnSubmit={false}
                  ref={(ref) => {
                    newTaskRef = ref;
                  }}
                  maxLength={30}
                  // next item focus
                />
                {currentTitle ? (
                  <AppButton onPress={handleAddTask}>
                    <MaterialIcons
                      name="done"
                      size={24}
                      color={THEME.DARK_COLOR}
                    />
                  </AppButton>
                ) : null}
              </View>
            }
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <AppButton onPress={handlerClose}>
          <MaterialIcons name="arrow-back" size={36} color={THEME.DARK_COLOR} />
        </AppButton>
        <AppButton onPress={handleDone}>
          <MaterialIcons name="done" size={36} color={THEME.DARK_COLOR} />
        </AppButton>
      </View>
    </View>
  );
};

// header options
AddBoard.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: THEME.HEADER_HEIGHT,
  },
  block: {
    width: THEME.BOARD_SIZE,
    height: THEME.BOARD_SIZE,
    borderWidth: THEME.BORDER_WIDTH,
    borderColor: THEME.DARK_COLOR,
    borderRadius: THEME.BOARD_RADIUS,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: THEME.FONT_SIZE,
    borderBottomWidth: THEME.BORDER_WIDTH,
    borderBottomColor: THEME.DARK_COLOR,
    flex: 1,
  },
  list: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addTaskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addTask: {
    fontSize: THEME.FONT_SIZE_SMALL,
    borderBottomWidth: 1,
    borderBottomColor: THEME.DARK_COLOR,
    flex: 1,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: THEME.BOARD_SIZE,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
