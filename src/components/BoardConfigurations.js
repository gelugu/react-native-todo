import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Modal,
} from "react-native";
import { THEME } from "../themes";
import { AppButton } from "./ui/AppButton";
import { AppText } from "./ui/AppText";
import { boardContext } from "../context/board/boardContext";

export const BoardConfigurations = ({ id, setIsConfig, isConfig }) => {
  const { removeBoard } = useContext(boardContext);

  const handleDelete = () => {
    setIsConfig(false);
    removeBoard(id);
  };

  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Modal visible={isConfig} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.box}>
          <AppButton style={styles.button} onPress={handleDelete}>
            <AppText>Delete</AppText>
          </AppButton>
          <AppButton
            style={styles.button}
            onPress={setIsConfig.bind(null, false)}
          >
            <AppText>Back</AppText>
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const size = Dimensions.get("window").width * 0.4;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: THEME.MAIN_COLOR,
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
});
