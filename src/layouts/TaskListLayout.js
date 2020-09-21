import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  Modal,
} from "react-native";

import { AddTask } from "../components/AddTask";
import { Task } from "../components/Task";
import { taskContext } from "../context/task/taskContext";
import { screenContext } from "../context/screen/screenContext";
import { THEME } from "../themes";
import { AppText } from "../components/ui/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { AppButton } from "../components/ui/AppButton";

//  task list element
export const TaskListLayout = ({ navigation }) => {
  const { board } = navigation.state.params;  // use getParam()
  const { tasks, addTask } = useContext(taskContext);
  const { changeScreen } = useContext(screenContext);

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={board.tasks}
            renderItem={({ item }) => {
              return <Task task={item} openTask={changeScreen} />;
            }}
            ListEmptyComponent={
              <View style={styles.imageWrap}>
                {/* <Image
                style={styles.image}
                source={require("../../assets/no-items.png")}
              /> */}
                <AppText>Add something to do...</AppText>
              </View>
            }
          />
        </View>

        <View style={styles.addTask}>
          <AddTask onSubmit={addTask} />
        </View>
      </View>
    </View>
  );
};

TaskListLayout.navigationOptions = ({navigation}) => {
  return {
    headerTitle: navigation.getParam('board').title,
    headerRight: <AppButton onPress={() => {}}>
    <MaterialIcons
    style={{paddingRight: 10}}
      name="more-horiz"
      size={40}
      color={THEME.MAIN_COLOR}
    />
  </AppButton>,
  }
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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
