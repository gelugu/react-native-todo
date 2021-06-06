import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Fade } from "../../../ui/animations/Fade";
import { AppButton } from "../../../ui/AppButton";
import { AppTextBold } from "../../../ui/AppTextBold";
import { THEME } from "../../../themes";
import { authContext } from "../AuthContext";

export const AuthHeader = () => {
  const { setEmailExist, emailExist } = useContext(authContext);

  return (
    <View style={styles.header}>
      <Fade style={styles.buttonBack} closeTriger={emailExist}>
        <AppButton onPress={setEmailExist.bind(null, true)}>
          <AntDesign
            name="arrowleft"
            size={THEME.ICON_SMALL}
            color={THEME.LIGHT_COLOR}
          />
        </AppButton>
      </Fade>
      <Fade closeTriger={emailExist}>
        <AppTextBold>Sign Up</AppTextBold>
      </Fade>
      <Fade closeTriger={!emailExist}>
        <AppTextBold>Sign In</AppTextBold>
      </Fade>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
    width: THEME.TASK_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonBack: {
    flex: 1,
    alignItems: "flex-start",
  },
});
