import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from "react-native";

import { AddTask } from "../components/AddTask";
import { Task } from "../components/Task";
import { THEME } from "../themes";
import { AppText } from "../components/ui/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { AppButton } from "../components/ui/AppButton";
import { boardContext } from "../context/board/boardContext";

//  task list element
export const TaskListLayout = ({ navigation }) => {
  const { board } = navigation.state.params; // use getParam()
  const { addTask } = useContext(boardContext);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
        data={board.tasks}
        renderItem={({ item }) => {
          return <Task boardId={board.id} task={item} navigation={navigation}/>;
        }}
        ListEmptyComponent={
          <View style={styles.imageWrap}>
            {/* <Image
                style={styles.image}
                source={require("../../assets/no-items.png")}
              /> */}
            <MaterialIcons name="no-sim" size={64} color="black" />
            <AppText>Still no tasks here...</AppText>
          </View>
        }
        ListFooterComponent={
          <View style={styles.addTask}>
            <AddTask onSubmit={addTask} boardId={board.id} />
          </View>
        }
      />
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
    //       size={40}
    //       color={THEME.MAIN_COLOR}
    //     />
    //   </AppButton>
    // ),
  };
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  list: {
    maxHeight: "90%",
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
  },
  addTask: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: THEME.GREY_COLOR,
    borderRadius: 5,
    marginTop: 10,
  },
  imageWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
