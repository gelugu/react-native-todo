import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";

import { BoardsLayout } from "../layouts/BoardsLayout/BoardsLayout";
import { AddBoard } from "../layouts/BoardsLayout/components/AddBoard";
import { TaskLayout } from "../layouts/TaskLayout/TaskLayout";
import { TaskListLayout } from "../layouts/TasksListLayout/TaskListLayout";
import { THEME } from "../themes";

const Navigator = createStackNavigator(
  {
    Boards: BoardsLayout,
    AddBoard: AddBoard,
    Tasks: TaskListLayout,
    Task: TaskLayout,
    Auth: AuthLayout,
  },
  {
    initialRoutName: "Boards",
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export const AppNavigator = createAppContainer(Navigator);
