// react components
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  RefreshControl,
} from "react-native";

// app components
import { Board } from "./components/Board";
import { AppButton } from "../../ui/AppButton";
import { AppLoading } from "../../ui/AppLoading";

// context
import { appContext, userContext, boardContext } from "../../context/contexts";

// style themes
import { THEME } from "../../themes";

// icons
import { MaterialIcons } from "@expo/vector-icons";
import { AppError } from "../../ui/AppError";
import { ButtonRow } from "./components/ButtonRow";

// Boards list layout (screen).
// Main app scrren, contain all boards.
export const BoardsLayout = ({ navigation }) => {
  // boards context.
  // boards - boards array.
  // fetchBoards - load boards from DB.
  // loading - state for showing loader component
  // error - state for showing error
  const { user } = useContext(userContext);
  const { boards, fetchBoards } = useContext(boardContext);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // load boards from DB
  const loadBoards = useCallback(async () => {
    setIsRefreshing(true);
    await fetchBoards();
    setIsRefreshing(false);
  }, [fetchBoards]);

  useEffect(() => {
    if (user === null) {
      navigation.navigate("Auth");
    } else {
      loadBoards();
    }
  }, [user]);

  // handle, move to board's tasks screen
  const openBoard = (board) => {
    navigation.navigate("Tasks", { board });
  };

  return (
    <View style={styles.container}>
      {/* <AppLoading /> */}
      <AppError />
      <FlatList
        style={{ width: "100%" }} // use 2 styles to move scrollbar to the right
        contentContainerStyle={{ alignItems: "center" }} // use 2 styles to move scrollbar to the right
        keyExtractor={(item) => item.id.toString()}
        data={boards}
        renderItem={({ item }) => {
          return <Board openBoard={openBoard} board={item} />;
        }}
        ListFooterComponent={
          // only show if less then 2 boards
          boards.length < 2 ? (
            <AppButton onPress={navigation.navigate.bind(null, "AddBoard")}>
              <View style={styles.addButtonLarge}>
                <MaterialIcons size={36} name="add" color={THEME.DARK_COLOR} />
              </View>
            </AppButton>
          ) : null
        }
        refreshControl={
          <RefreshControl
            colors={[THEME.GREY_COLOR]}
            refreshing={isRefreshing}
            onRefresh={loadBoards}
          />
        }
      />
      <ButtonRow navigation={navigation} />
    </View>
  );
};

// header options
BoardsLayout.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    ...THEME.HEADER,
    ...THEME.CONTAINER_CENTER,
  },
  addButtonLarge: {
    ...THEME.CONTAINER_CENTER,
    ...THEME.BOARD,
  },
});
