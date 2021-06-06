import React from "react";
import { useFonts } from "expo-font";

import { AppState } from "./src/context/AppState";
import { UserState } from "./src/context/UserState";
import { BoardState } from "./src/context/BoardState";

import { AppNavigator } from "./src/navigation/AppNavigation";
import { StatusBar } from "react-native";
import { THEME } from "./src/themes";

export default function App() {
  const [fontsLoaded] = useFonts({
    CourierPrimeRegular: require("./assets/fonts/CourierPrime-Regular.ttf"),
    CourierPrimeBold: require("./assets/fonts/CourierPrime-Bold.ttf"),
    CourierPrimeItalic: require("./assets/fonts/CourierPrime-Italic.ttf"),
    CourierPrimeBoldItalic: require("./assets/fonts/CourierPrime-BoldItalic.ttf"),
  });

  return (
    <AppState>
      <UserState>
        <BoardState>
          <AppNavigator />
          <StatusBar
            backgroundColor={THEME.DARK_COLOR}
            barStyle="light-content"
          />
        </BoardState>
      </UserState>
    </AppState>
  );
}
