import React, { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Modal,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { THEME } from "../themes";
import { AppButton } from "./ui/AppButton";
import { AppText } from "./ui/AppText";
import { screenContext } from "../context/screen/screenContext";
import { boardContext } from "../context/board/boardContext";

export const ModalAddBoard = () => {
  const { addBoardModal, hideAddBoard } = useContext(screenContext);
  const { addBoard } = useContext(boardContext);

  const [taskList, setTaskList] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [boardTitle, setBoardTitle] = useState("");

  const handleDone = () => {
    if (boardTitle) {
      addBoard({
        title: boardTitle,
        tasks: taskList
      })
      setBoardTitle("");
    }
    
    setTaskList([]);
    hideAddBoard();
  };

  const handleAddTask = () => {
    if (currentTitle) {
      setTaskList([
        ...taskList,
        { title: currentTitle, done: false, id: Date.now() },
      ]);
      setCurrentTitle("");
    }
  };

  return (
    <Modal
      animationType="slide"
      // statusBarTranslucent={false}
      // transparent={false}
      visible={addBoardModal}
    >
      <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.header}>
            <TextInput
              value={boardTitle}
              style={styles.title}
              autoFocus={true}
              onChangeText={setBoardTitle}
            />
            <AppButton onPress={handleDone}>
              <MaterialIcons name="done" size={30} color="black" />
            </AppButton>
          </View>

          <View style={styles.list}>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={taskList}
              renderItem={({ item }) => {
                return (
                  <View style={styles.taskRow}>
                    <Entypo name="dot-single" size={24} color="black" />
                    <AppText>{item.title}</AppText>
                  </View>
                );
              }}
              ListFooterComponent={
                <View style={styles.addTaskRow}>
                  <AppButton>
                    <MaterialIcons name="add" size={24} color="black" />
                  </AppButton>
                  <TextInput
                    value={currentTitle}
                    style={styles.addTask}
                    onChangeText={setCurrentTitle}
                    onEndEditing={handleAddTask}
                    // next item focus
                  />
                </View>
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const width = Dimensions.get("window").width * 0.9;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  block: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: width,
    height: width,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 5,
  },
  title: {
    borderBottomWidth: 1,
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
});
