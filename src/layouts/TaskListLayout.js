import React, { useContext } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";

import { AddTask } from "../components/AddTask";
import { Task } from "../components/Task";
import { taskContext } from "../context/task/taskContext";
import { screenContext } from "../context/screen/screenContext";

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
    height: Dimensions.get("window").height * 0.9,
    width: Dimensions.get("window").width * 0.9,
  },
  list: {
    height: "100%",
    paddingVertical: 5,
  },
  addTask: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
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
