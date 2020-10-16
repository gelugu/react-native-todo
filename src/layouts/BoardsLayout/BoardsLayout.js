// react components
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";

// app components
import { Board } from "./components/Board";
import { AppButton } from "../../ui/AppButton";
import { AppLoader } from "../../ui/AppLoader";
import { AppText } from "../../ui/AppText";

// context
import { appContext, userContext, boardContext } from "../../context/contexts";

// style themes
import { THEME } from "../../themes";

// icons
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// Boards list layout (screen).
// Main app scrren, contain all boards.
export const BoardsLayout = ({ navigation }) => {
  // boards context.
  // boards - boards array.
  // fetchBoards - load boards from DB.
  // loading - state for showing loader component
  // error - state for showing error
  const { user, signOut, checkAuth } = useContext(userContext);
  const { loading, error } = useContext(appContext);
  const { boards, fetchBoards } = useContext(boardContext);

  // load boards from DB
  const loadBoards = useCallback(async () => await fetchBoards(), [
    fetchBoards,
  ]);

  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    if (!user) {
      navigation.navigate("Auth");
    } else {
      loadBoards();
    }
  }, [user]);

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
            <AppButton onPress={navigation.navigate.bind(null, "AddBoard")}>
              <View style={styles.block}>
                <MaterialIcons size={36} name="add" color={THEME.DARK_COLOR} />
              </View>
            </AppButton>
          ) : null
        }
      />
      {/* when more then 2 boards show small button */}
      {boards.length >= 2 ? (
        <View style={styles.addButton}>
          <AppButton onPress={navigation.navigate.bind(null, "AddBoard")}>
            <MaterialIcons name="add-box" size={50} color={THEME.DARK_COLOR} />
          </AppButton>
        </View>
      ) : null}
      {/* modal component to add new board */}
    </View>
  );
};

// header options
BoardsLayout.navigationOptions = {
  headerShown: false,
  headerTitleAlign: "center",
  headerStyle: {
    elevation: 0,
    backgroundColor: THEME.LIGHT_COLOR,
  },
  headerTitleStyle: {
    color: THEME.TEXT_COLOR,
    fontSize: THEME.FONT_SIZE,
    fontFamily: "rotota-bold",
  },
  headerRight: () => (
    <AppButton
      onPress={() => {
        FBsignOut();
      }}
    >
      <MaterialCommunityIcons
        name="logout-variant"
        size={30}
        color={THEME.DARK_COLOR}
      />
    </AppButton>
  ),
  headerRightContainerStyle: {
    paddingRight: 10,
  },
};

const styles = StyleSheet.create({
  container: {
    ...THEME.HEADER,
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
  block: {
    alignItems: "center",
    justifyContent: "center",
    height: THEME.BOARD_SIZE,
    width: THEME.BOARD_SIZE,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: THEME.BOARD_RADIUS,
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
});
