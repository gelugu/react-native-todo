import React, { useContext, useState } from "react";
import { StyleSheet, View, Modal, TextInput, FlatList } from "react-native";

import { AppButton } from "../../../ui/AppButton";
import { AppText } from "../../../ui/AppText";
import { boardContext } from "../../../context/boardContext";
import { taskPlaceholders, boardPlaceholders } from "../../../placeholders";

import { THEME } from "../../../themes";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export const ModalAddBoard = ({ visible, close }) => {
  const { addBoard } = useContext(boardContext);

  const [taskList, setTaskList] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [boardTitle, setBoardTitle] = useState("");

  const handleDone = () => {
    if (boardTitle) {
      addBoard(boardTitle, taskList);
      setBoardTitle("");
    }
    setTaskList([]);
    close();
  };

  const handleAddTask = () => {
    if (currentTitle) {
      setTaskList([...taskList, currentTitle]);
      setCurrentTitle("");
    }
  };

  const handlerClose = () => {
    setBoardTitle("");
    setCurrentTitle("");
    setTaskList([]);
    close();
  };

  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.header}>
            <TextInput
              value={boardTitle}
              style={styles.title}
              autoFocus={true}
              onChangeText={setBoardTitle}
              onSubmitEditing={handleDone}
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
            <MaterialIcons
              name="arrow-back"
              size={36}
              color={THEME.DARK_COLOR}
            />
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
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
    justifyContent: "flex-end",
    width: THEME.BOARD_SIZE,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
