import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AddTask } from "./components/AddTask";
import { Task } from "./components/Task";
import { THEME } from "../../themes";
import { AppText } from "../../ui/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { boardContext } from "../../context/contexts";

//  task list element
export const TaskListLayout = ({ navigation }) => {
  const { board } = navigation.state.params; // use getParam()
  const { addTask } = useContext(boardContext);

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={false}
        keyExtractor={(item) => item.id.toString()}
        data={board.tasks}
        renderItem={({ item }) => {
          return (
            <Task boardId={board.id} task={item} navigation={navigation} />
          );
        }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.imageWrap}>
            <MaterialIcons name="no-sim" size={64} color={THEME.DARK_COLOR} />
            <AppText>Still no tasks here...</AppText>
          </View>
        }
      />

      <AddTask onSubmit={addTask} boardId={board.id} />
    </View>
  );
};

TaskListLayout.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("board").title,
    // headerRight: () => (
    //   <AppButton onPress={() => {}}>
    //     <MaterialIcons
    //       style={{ paddingRight: 10 }}
    //       name="more-horiz"
    //       size={36}
    //       color={THEME.DARK_COLOR}
    //     />
    //   </AppButton>
    // ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  list: {
    alignItems: "center",
  },
  imageWrap: {
    alignItems: "center",
  }
});
