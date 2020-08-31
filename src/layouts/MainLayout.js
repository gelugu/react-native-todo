import React, { useContext } from "react";

import { View } from "react-native";

import { Navbar } from "../components/Navbar";
import { TaskLayout } from "./TaskLayout";
import { TaskListLayout } from "./TaskListLayout";
import { screenContext } from "../context/screen/screenContext";

export const MainLayout = () => {
  const { taskId } = useContext(screenContext);

  return (
    <View>
      <Navbar />
      {taskId ? <TaskLayout /> : <TaskListLayout />}
    </View>
  );
};
