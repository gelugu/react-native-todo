import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";

import { Wrapper } from "../../../ui/Wrapper";
import { AppButton } from "../../../ui/AppButton";
import { AppText } from "../../../ui/AppText";
import { boardContext } from "../../../context/contexts";
import { taskPlaceholders, boardPlaceholders } from "../../../placeholders";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { colors, deviceWidth, fontSize, iconSize } from "../../../styleConfig";

export const AddBoard = ({ navigation }) => {
  const { addBoard } = useContext(boardContext);

  const [taskList, setTaskList] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [boardTitle, setBoardTitle] = useState("");
  const [boardPlaceholder, setBoardPlaceholder] = useState("");
  const [taskPlaceholder, setTaskPlaceholder] = useState("");

  let newTaskRef = useRef(null);

  useEffect(() => {
    setBoardPlaceholder(boardPlaceholders());
  }, []);

  useEffect(() => {
    setTaskPlaceholder(taskPlaceholders());
  }, [newTaskRef]);

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
    <Wrapper>
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
            placeholder={boardPlaceholder}
            placeholderTextColor={colors.textOpacity}
            maxLength={30}
          />
          {boardTitle ? (
            <AppButton onPress={handleDone}>
              <MaterialIcons
                name="done"
                size={iconSize.small}
                color={colors.primary}
              />
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
                    size={iconSize.small}
                    color={colors.primary}
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
                    size={iconSize.small}
                    color={colors.primary}
                  />
                </AppButton>
                <TextInput
                  value={currentTitle}
                  style={styles.addTask}
                  onChangeText={setCurrentTitle}
                  onEndEditing={handleAddTask}
                  placeholder={taskPlaceholder}
                  placeholderTextColor={colors.textOpacity}
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
                      size={iconSize.small}
                      color={colors.primary}
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
            size={iconSize.regular}
            color={colors.primary}
          />
        </AppButton>
        <AppButton onPress={handleDone}>
          <MaterialIcons
            name="done"
            size={iconSize.regular}
            color={colors.primary}
          />
        </AppButton>
      </View>
    </Wrapper>
  );
};

// header options
AddBoard.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  block: {
    width: deviceWidth * 0.9,
    height: deviceWidth * 0.9,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 20,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: fontSize.regular,
    fontFamily: "CourierPrimeRegular",
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
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
    fontSize: fontSize.small,
    fontFamily: "CourierPrimeRegular",
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    flex: 1,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: deviceWidth * 0.9,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
