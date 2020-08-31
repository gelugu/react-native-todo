import React, { useContext } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions, Modal } from "react-native";

import { AddTask } from "../components/AddTask";
import { Task } from "../components/Task";
import { taskContext } from "../context/task/taskContext";
import { screenContext } from "../context/screen/screenContext";
import { THEME } from "../themes";

//  task list element
export const TaskListLayout = () => {
  const { tasks, addTask } = useContext(taskContext);
  const { changeScreen } = useContext(screenContext);

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        <View style={styles.list}>
          {tasks.length ? (
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={tasks}
              renderItem={({ item }) => {
                return <Task task={item} openTask={changeScreen} />;
              }}
            />
          ) : (
            <View style={styles.imageWrap}>
              <Image
                style={styles.image}
                source={require("../../assets/no-items.png")}
              />
            </View>
          )}
        </View>

        <View style={styles.addTask}>
          <AddTask onSubmit={addTask} />
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  list: {
    maxHeight: "90%",
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
  },
  addTask: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  imageWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
