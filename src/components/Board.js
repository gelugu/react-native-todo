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
import { boardContext } from "../context/board/boardContext";

export const Board = ({board}) => {
  const { removeBoard } = useContext(boardContext)

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper style={{borderColor: "red", borderWidth: 2}} onLongPress={removeBoard.bind(null, board.id)}>
      <View style={styles.board}>
        <View style={styles.header}>
          <AppText style={styles.title}>{board.title}</AppText>
          <AppButton>
            <MaterialIcons
              name="more-horiz"
              size={35}
              color={THEME.MAIN_COLOR}
            />
          </AppButton>
        </View>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={board.tasks}
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
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: THEME.MAIN_COLOR,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 10
  },
  title: {
    fontSize: 18,
    // borderWidth: 1,
  },
  list: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
