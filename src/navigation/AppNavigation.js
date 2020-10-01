import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { BoardsLayout } from "../layouts/BoardsLayout/BoardsLayout";
import { TaskLayout } from "../layouts/TaskLayout/TaskLayout";
import { TaskListLayout } from "../layouts/TasksListLayout/TaskListLayout";
import { THEME } from "../themes";

const Navigator = createStackNavigator(
  {
    Boards: BoardsLayout,
    Tasks: TaskListLayout,
    Task: TaskLayout,
  },
  {
    initialRoutName: "Boards",
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: THEME.LIGHT_COLOR,
      }
    }
  }
);

export const AppNavigator = createAppContainer(Navigator);
