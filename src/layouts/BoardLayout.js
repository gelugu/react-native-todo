import React, { useCallback, useContext, useEffect } from "react";
import { StyleSheet, View, FlatList, Dimensions, Button } from "react-native";
import { Board } from "../components/Board";
import { AddBoard } from "../components/AddBoard";
import { ModalAddBoard } from "../components/ModalAddBoard";
import { boardContext } from "../context/board/boardContext";
import { AppButton } from "../components/ui/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { screenContext } from "../context/screen/screenContext";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { THEME } from "../themes";

export const BoardLayout = ({navigation}) => {
  const { showAddBoard } = useContext(screenContext);
  const { boards, fetchBoards, loading, error } = useContext(boardContext);

  const openBoard = (board) => {
    navigation.navigate("Tasks", {board})
  }

  const loadBoards = useCallback(async () => await fetchBoards(), [
    fetchBoards,
  ]);
  useEffect(() => {
    loadBoards();
  }, []);
  if (loading) return <AppLoader style={styles.loader} />;
  if (error)
    return (
      <View style={styles.errorView}>
        <AppText style={styles.errorText}>{error}</AppText>
        <Button
          onPress={loadBoards}
          title="Try again"
          color={THEME.MAIN_COLOR}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={boards}
        renderItem={({ item }) => {
          return <Board openBoard={openBoard} board={item} />; //
        }}
        ListFooterComponent={boards.length < 2 ? <AddBoard /> : null}
      />
      {boards.length >= 2 ? (
        <View style={{ position: "absolute", bottom: 25, right: 25 }}>
          <AppButton onPress={showAddBoard}>
            <MaterialIcons name="add-box" size={50} color="black" />
          </AppButton>
        </View>
      ) : null}
      <ModalAddBoard />
    </View>
  );
};

BoardLayout.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    paddingTop:
      10 + Dimensions.get("screen").height - Dimensions.get("window").height,
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
    paddingHorizontal: 10,
    alignContent: "center"
  },
});
