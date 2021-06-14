import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { Task } from "./Task";
import { colors, iconSize } from '../../../styleConfig';

export const TaskList = ({tasks}) => {
  return (
    <FlatList
      style={styles.list}
      keyExtractor={(item) => item.id.toString()}
      data={tasks}
      renderItem={({ item }) => {
        return <Task item={item} />;
      }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="no-sim"
            size={iconSize.large}
            color={colors.secondary}
          />
        </View>
      }
    />
  );
}

  const styles = StyleSheet.create({
    list: {
      flex: 1,
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
});
