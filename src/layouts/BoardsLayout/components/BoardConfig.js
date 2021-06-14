import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../../../styleConfig";

export const BoardConfig = ({ board }) => {
  const { removeBoard, renameBoard } = useContext(boardContext);

  const [newTitle, setNewTitle] = useState(board.title);

  const togleIsConfig = () => {
    setIsConfig(!isConfig);
    setNewTitle(board.title);
  };

  return (
    <View style={styles.board}>
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            style={styles.newTitle}
            maxLength={30}
          />
          {newTitle !== board.title ? (
            <AppButton onPress={renameBoard.bind(null, board.id, newTitle)}>
              <MaterialIcons name="done" size={24} color={colors.primary} />
            </AppButton>
          ) : (
            <AppButton onPress={setIsConfig.bind(null, false)}>
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={THEME.DARK_COLOR}
              />
            </AppButton>
          )}
        </View>
        <View style={styles.box}>
          <AppButton
            style={styles.button}
            onPress={openBoard.bind(null, board)}
          >
            <AppText style={styles.buttonText}>Open</AppText>
          </AppButton>
          <AppButton
            style={styles.button}
            onPress={removeBoard.bind(null, board.id)}
          >
            <AppText style={{ ...styles.buttonText, color: THEME.RED_COLOR }}>
              Delete
            </AppText>
          </AppButton>
          <AppButton
            style={styles.button}
            onPress={setIsConfig.bind(null, false)}
          >
            <AppText style={styles.buttonText}>Back</AppText>
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: deviceWidth * 0.9,
    height: deviceWidth * 0.9,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: fontSize.bold,
  },
  list: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  taskTitle: {
    fontSize: fontSize.small,
    marginLeft: 5,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 11,
    paddingRight: 20,
  },
  newTitle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    flex: 1,
    fontSize: fontSize.bold,
  },
  box: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: fontSize.bold,
  },
});
