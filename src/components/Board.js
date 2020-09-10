import React, { useContext, useState } from "react";
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
import { BoardConfigurations } from "./BoardConfigurations";

export const Board = ({ board }) => {
  const { removeBoard } = useContext(boardContext);
  const [isConfig, setIsConfig] = useState(false);

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper onLongPress={removeBoard.bind(null, board.id)}>
      <View style={styles.board}>
        <View style={styles.header}>
          <AppText style={styles.title}>{board.title}</AppText>
          {isConfig ? (
            <BoardConfigurations
              id={board.id}
              setIsConfig={setIsConfig}
              isConfig={isConfig}
            />
          ) : (
            <AppButton onPress={setIsConfig.bind(null, true)}>
              <MaterialIcons
                name="more-horiz"
                size={40}
                color={THEME.MAIN_COLOR}
              />
            </AppButton>
          )}
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 11,
    paddingTop: 10,
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
