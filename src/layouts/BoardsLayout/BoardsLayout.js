// react components
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Dimensions, Button } from "react-native";

// app components
import { Board } from "./components/Board";
import { AddBoard } from "./components/AddBoard";
import { ModalAddBoard } from "./components/ModalAddBoard";
import { AppButton } from "../../ui/AppButton";
import { AppLoader } from "../../ui/AppLoader";
import { AppText } from "../../ui/AppText";

// app layouts
import { AuthLayout } from "../AuthLayout/AuthLayout";

// context
import { boardContext } from "../../context/boardContext";

// style themes
import { THEME } from "../../themes";

// icons
import { MaterialIcons } from "@expo/vector-icons";

// Boards list layout (screen).
// Main app scrren, contain all boards.
export const BoardsLayout = ({ navigation }) => {
  // state for visibility addBoard modal component
  const [showAddBoard, setShowAddBoard] = useState(false);

  // boards context.
  // boards - boards array.
  // fetchBoards - load boards from DB.
  // loading - state for showing loader component
  // error - state for showing error
  const { boards, fetchBoards, loading, error } = useContext(boardContext);

  const [user, setUser] = useState();

  // load boards from DB
  const loadBoards = useCallback(async () => await fetchBoards(), [
    fetchBoards,
  ]);
  useEffect(() => {
    loadBoards();
  }, []);

  if (!user) {
    return <AuthLayout setUser={setUser}/>
  }

  if (loading) return <AppLoader style={styles.loader} />; // TODO: add custom animation
  if (error)
    return (
      <View style={styles.errorView}>
        <AppText style={styles.errorText}>{error}</AppText>
        {/* add error image (background) */}
        <Button
          onPress={loadBoards}
          title="Try again"
          color={THEME.MAIN_COLOR}
        />
      </View>
    );

  // handle, move to board's tasks screen
  const openBoard = (board) => {
    navigation.navigate("Tasks", { board });
  };

  return (
    <View style={styles.container}>
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
            <AddBoard open={setShowAddBoard.bind(null, true)} />
          ) : null
        }
      />
      {/* when more then 2 boards show small button */}
      {boards.length >= 2 ? (
        <View style={styles.addButton}>
          <AppButton onPress={setShowAddBoard.bind(null, true)}>
            <MaterialIcons name="add-box" size={50} color="black" />
          </AppButton>
        </View>
      ) : null}
      {/* modal component to add new board */}
      <ModalAddBoard
        visible={showAddBoard}
        close={setShowAddBoard.bind(null, false)}
      />
    </View>
  );
};

// header options
BoardsLayout.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10 + THEME.HEADER_HEIGHT,
    flex: 1,
    alignItems: "center",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    marginBottom: 30,
    paddingHorizontal: 50,
    alignContent: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
});
