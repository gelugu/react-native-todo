import React from "react";
import { useFonts } from "expo-font";

import { AppState } from "./src/context/AppState";
import { UserState } from "./src/context/UserState";
import { BoardState } from "./src/context/BoardState";

import { AppNavigator } from "./src/navigation/AppNavigation";

export default function App() {
  return (
    <AppState>
      <UserState>
        <BoardState>
          <AppNavigator />
        </BoardState>
      </UserState>
    </AppState>
  );
}
