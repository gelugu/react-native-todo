import React, { useContext } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { Board } from "../components/Board";
import { AddBoard } from "../components/AddBoard";
import { ModalAddBoard } from "../components/ModalAddBoard";
import { boardContext } from "../context/board/boardContext";
import { AppButton } from "../components/ui/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { screenContext } from "../context/screen/screenContext";

export const BoardLayout = () => {
  const { boards } = useContext(boardContext);
  const { showAddBoard } = useContext(screenContext);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={boards}
        renderItem={({ item }) => {
          return <Board board={item} />; //
        }}
        ListFooterComponent={boards.length < 2 ? <AddBoard /> : null}
      />
      {boards.length >= 2 ? (
        <View style={{position: "absolute", bottom: 25, right: 25}}>
          <AppButton onPress={showAddBoard}>
            <MaterialIcons name="add-box" size={50} color="black" />
          </AppButton>
        </View>
      ) : null}
      <ModalAddBoard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: "center",
  },
});
