import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { BoardLayout } from "../layouts/BoardLayout";
import { TaskListLayout } from "../layouts/TaskListLayout";

const Navigator = createStackNavigator(
  {
    Boards: BoardLayout,
    Tasks: TaskListLayout,
  },
  {
    initialRoutName: "Boards",
  }
);

export const AppNavigator = createAppContainer(Navigator);
