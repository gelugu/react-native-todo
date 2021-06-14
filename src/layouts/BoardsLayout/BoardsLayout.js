import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  RefreshControl,
  Dimensions,
} from "react-native";

import { Board } from "./components/Board";
import { AppButton } from "../../ui/AppButton";
import { AppLoading } from "../../ui/AppLoading";
import {List} from './components/List'

import { appContext, userContext, boardContext } from "../../context/contexts";

import { THEME } from "../../themes";

import { MaterialIcons } from "@expo/vector-icons";
import { AppError } from "../../ui/AppError";
import { ButtonRow } from "./components/ButtonRow";
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
      <List navigation={navigation} loadBoards={loadBoards}/>
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
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Dimensions.get("screen").height - Dimensions.get("window").height + 10,
    backgroundColor: colors.background
  },
  addButtonLarge: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    
    marginBottom: 10,
    
    borderWidth: .3,
    borderColor: "transparent",
    borderRadius: 20,
    
    elevation: 1.5,
  },
});
