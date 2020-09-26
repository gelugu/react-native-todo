import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  FlatList,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { AppButton } from "./ui/AppButton";
import { AppText } from "./ui/AppText";
import { boardContext } from "../context/board/boardContext";
import { taskPlaceholders, boardPlaceholders } from "../../assets/placeholders";

import { THEME } from "../themes";

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
    <Modal
      animationType="slide"
      visible={visible}
    >
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
                <MaterialIcons name="done" size={30} color={THEME.MAIN_COLOR} />
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
                    <Entypo name="dot-single" size={24} color={THEME.MAIN_COLOR} />
                    <AppText>{item}</AppText>
                  </View>
                );
              }}
              ListFooterComponent={
                <View style={styles.addTaskRow}>
                  <AppButton>
                    <MaterialIcons name="add" size={24} color={THEME.MAIN_COLOR} />
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
                      <MaterialIcons name="done" size={24} color={THEME.MAIN_COLOR} />
                    </AppButton>
                  ) : null}
                </View>
              }
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <AppButton onPress={handlerClose}>
            <MaterialIcons name="arrow-back" size={30} color={THEME.MAIN_COLOR} />
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
  },
  block: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: THEME.BOARD_SIZE,
    height: THEME.BOARD_SIZE,
    marginTop: 10,
    borderWidth: THEME.BORDER_WIDTH,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    borderBottomWidth: THEME.BORDER_WIDTH,
    borderBottomColor: THEME.MAIN_COLOR,
    width: "80%",
  },
  list: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    width: "90%",
    height: "80%",
  },
  addTaskRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  addTask: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
    width: "85%",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: THEME.BOARD_SIZE,
    paddingTop: 20,
    paddingHorizontal: 30,
  },
});
