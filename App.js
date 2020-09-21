import React from "react";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

import { TaskState } from "./src/context/task/TaskState";
import { ScreenState } from "./src/context/screen/ScreenState";
import { BoardState } from "./src/context/board/BoardState";
import { AppNavigator } from "./src/navigation/AppNavigation";

//  main app element
export default function App() {
  // fonts loading switch
  const [fontsLoaded] = useFonts({
    "rotota-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "rotota-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  return fontsLoaded ? (
    <BoardState>
      <ScreenState>
        <TaskState>
          <AppNavigator/>
        </TaskState>
      </ScreenState>
      
    </BoardState>
  ) : (
    <AppLoading />
  );
}
