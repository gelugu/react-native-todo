import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { userContext, boardContext } from "../../context/contexts";

import { AppError } from "../../ui/AppError";
import { ButtonRow } from "./components/ButtonRow";
import { AppLoading } from "../../ui/AppLoading";
import { List } from "./components/List";
import { Menu } from "./components/Menu";

import { colors } from "../../styleConfig";

export const BoardsLayout = ({ navigation }) => {
  const { user } = useContext(userContext);
  const { fetchBoards } = useContext(boardContext);

  const loadBoards = useCallback(async () => {
    await fetchBoards();
  }, [fetchBoards]);

  useEffect(() => {
    if (user === null) {
      navigation.navigate("Auth");
    } else {
      loadBoards();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <AppLoading />
      <AppError />
      {/* <Menu /> */}
      <List navigation={navigation} loadBoards={loadBoards} />
      <ButtonRow navigation={navigation} />
    </View>
  );
};

BoardsLayout.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
