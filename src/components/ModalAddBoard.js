import React, { useContext } from "react";
import { Dimensions, StyleSheet, View, Modal, TextInput, FlatList } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

import { THEME } from "../themes";
import { AppButton } from "./ui/AppButton";
import { AppText } from "./ui/AppText";
import { screenContext } from "../context/screen/screenContext";

export const ModalAddBoard = () => {
  const {addBoard, hideAddBoard} = useContext(screenContext)
  const taskList = [
  ];

  const handleDone = () => {
    hideAddBoard()
  }

  return (
    <Modal
      animationType="slide"
      // statusBarTranslucent={false}
      // transparent={false}
      visible={addBoard}
    >
      <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.header}>
            <TextInput
              style={styles.title}
              autoFocus={true}
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
            return (<View style={styles.taskRow}>
              <Entypo name="dot-single" size={24} color="black" />
              <AppText>{item.title}</AppText>
              </View>);
            }}
            />
            <View style={styles.addTaskRow}>
              <AppButton>
                <MaterialIcons name="add" size={24} color="black" />
              </AppButton>
              <TextInput style={styles.addTask} />
            </View>
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
    height: "80%"
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
