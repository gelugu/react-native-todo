import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { BoardLayout } from "../layouts/BoardLayout";
import { TaskLayout } from "../layouts/TaskLayout";
import { TaskListLayout } from "../layouts/TaskListLayout";

const Navigator = createStackNavigator(
  {
    Boards: BoardLayout,
    Tasks: TaskListLayout,
    Task: TaskLayout,
  },
  {
    initialRoutName: "Boards",
  }
);

export const AppNavigator = createAppContainer(Navigator);
