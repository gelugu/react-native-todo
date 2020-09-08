import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { THEME } from "../themes";
import { AppText } from "./ui/AppText";
import { AppButton } from "./ui/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { taskContext } from "../context/task/taskContext";

export const Board = () => {
  const { tasks } = useContext(taskContext);

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper>
      <View style={styles.board}>
        <View style={styles.header}>
          <AppText style={styles.title}>BoardTitle</AppText>
          <AppButton>
            <MaterialIcons
              name="more-horiz"
              size={26}
              color={THEME.MAIN_COLOR}
            />
          </AppButton>
        </View>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={tasks}
          renderItem={({ item }) => {
            return (
              <View style={styles.list}>
                {item.done ? (
                  <MaterialIcons
                    name="radio-button-checked"
                    size={12}
                    color={THEME.MAIN_COLOR}
                  />
                ) : (
                  <MaterialIcons
                    name="radio-button-unchecked"
                    size={12}
                    color={THEME.MAIN_COLOR}
                  />
                )}
                <AppText style={{ marginLeft: 5 }}>{item.title}</AppText>
              </View>
            );
          }}
        />
      </View>
    </Wrapper>
  );
};

const size = Dimensions.get("window").width * 0.9;
const styles = StyleSheet.create({
  board: {
    width: size,
    height: size,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: THEME.MAIN_COLOR,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 18,
    // borderWidth: 1,
  },
  list: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
