import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View, FlatList, 
  RefreshControl, Dimensions} from 'react-native';
import { colors } from '../../../styleConfig';

import { Board } from "./Board";
import { AppButton } from "../../../ui/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { boardContext } from '../../../context/contexts';

export const List = ({navigation, loadBoards}) => {
  const { boards, fetchBoards } = useContext(boardContext);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshBoards = useCallback(async () => {
    setIsRefreshing(true);
    await loadBoards();
    setIsRefreshing(false);
  }, [fetchBoards]);

  const openBoard = (board) => {
    navigation.navigate("Tasks", { board });
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      keyExtractor={(item) => item.id.toString()}
      data={boards}
      renderItem={({ item }) => {
        return <Board openBoard={openBoard} board={item} />;
      }}
      ListFooterComponent={
        boards.length < 2 ? (
          <AppButton onPress={navigation.navigate.bind(null, "AddBoard")}>
            <View style={styles.addButtonLarge}>
              <MaterialIcons size={36} name="add" color={colors.primary} />
            </View>
          </AppButton>
        ) : null
      }
      refreshControl={
        <RefreshControl
          colors={Object.values(colors)}
          refreshing={isRefreshing}
          onRefresh={refreshBoards}
        />
      }
    />
  );
}

  const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    alignItems: "center",
  },
  addButtonLarge: {
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,

    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    
    borderWidth: .3,
    borderColor: "transparent",
    borderRadius: 20,
    
    elevation: 1.5,
  },
});
