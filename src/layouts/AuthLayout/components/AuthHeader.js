import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Fade } from "../../../ui/animations/Fade";
import { AppButton } from "../../../ui/AppButton";
import { AppTextBold } from "../../../ui/AppTextBold";
import { authContext } from "../AuthContext";
import { colors, iconSize } from "../../../styleConfig";

export const AuthHeader = () => {
  const { setEmailExist, emailExist } = useContext(authContext);

  return (
    <View style={styles.header}>
      <Fade closeTriger={emailExist}>
        <AppButton onPress={setEmailExist.bind(null, true)}>
          <AntDesign
            name="arrowleft"
            size={iconSize.small}
            color={colors.primary}
          />
        </AppButton>
      </Fade>
      {emailExist ? (
        <AppTextBold>Sign In</AppTextBold>
      ) : (
        <AppTextBold>Sign Up</AppTextBold>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
