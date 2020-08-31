import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {useFonts} from "expo-font";
import { AppLoading } from "expo";

import { Navbar } from "./src/components/Navbar"; //App header element
import { TaskListLayout } from "./src/layouts/TaskListLayout";
import { TaskLayout } from "./src/layouts/TaskLayout";

//  main app element
export default function App() {

  // fonts loading switch
  const [fontsLoaded] = useFonts({
    "rotota-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "rotota-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  // hook contain tasks array and method to change this array
  const [tasks, setTask] = useState([
    { id: "1", title: "Learn reactNative" },
    { id: "2", title: "Write app" },
  ]);

  // method to add new task
  const addTask = (title) => {
    setTask((taskArray) => [
      ...taskArray, // get current tasks array
      // push new task in back
      {
        id: Date.now().toString(),
        title,
      },
    ]);
  };

  // methid to remove task by 'id'
  const removeTask = (id) => {
    setTaskId(null);
    setTask((prev) => prev.filter((taks) => taks.id !== id));
  };

  // metho to change task name
  const updateTask = (id, title) => {
    setTask((taskList) =>
      taskList.map((task) => {
        if (task.id === id) task.title = title;
        return task;
      })
    );
  };

  // hook contain current id and method to set this
  const [taskId, setTaskId] = useState(null);

  return fontsLoaded ? (
    <View>
      <Navbar />
      {taskId ? (
        <TaskLayout
          goBack={() => setTaskId(null)}
          task={tasks.find((task) => task.id === taskId)}
          removeTask={removeTask}
          onSave={updateTask}
        />
      ) : (
        <TaskListLayout
          tasks={tasks}
          addTask={addTask}
          removeTask={removeTask}
          openTask={setTaskId}
        />
      )}
    </View>
  ) : (
    <AppLoading/>
  );
}

const styles = StyleSheet.create({});
