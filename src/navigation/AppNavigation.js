import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { BoardsLayout } from "../layouts/BoardsLayout/BoardsLayout";
import { TaskLayout } from "../layouts/TaskLayout/TaskLayout";
import { TaskListLayout } from "../layouts/TasksListLayout/TaskListLayout";

const Navigator = createStackNavigator(
  {
    Boards: BoardsLayout,
    Tasks: TaskListLayout,
    Task: TaskLayout,
  },
  {
    initialRoutName: "Boards",
  }
);

export const AppNavigator = createAppContainer(Navigator);
