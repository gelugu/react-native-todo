import React, { useState } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";

import { AddTask } from "../components/AddTask"; // Form to add new task
import { Task } from "../components/Task"; // Task element

//  task list element
export const TaskListLayout = ({ tasks, addTask, openTask }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.list}>
          {tasks.length ? (
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={tasks}
              renderItem={({ item }) => {
                return <Task task={item} openTask={openTask} />;
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

        <AddTask style={styles.addTask} onSubmit={addTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "97%",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  list: {
    height: '90%',
  },
  addTask: {
    alignSelf: "flex-end",
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
