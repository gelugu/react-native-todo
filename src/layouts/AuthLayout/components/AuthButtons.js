import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { userContext } from "../../../context/contexts";
import { THEME } from "../../../themes";
import { Fade } from "../../../ui/animations/Fade";
import { Spin } from "../../../ui/animations/Spin";
import { AppButton } from "../../../ui/AppButton";
import { AppTextBold } from "../../../ui/AppTextBold";
import { authContext } from "../AuthContext";

export const AuthButtons = ({}) => {
  const { signIn, signUp, logInAnonymous, isUserExist } =
    useContext(userContext);
  const {
    email,
    password,
    emailExist,
    setEmailExist,
    passwordEquile,
    emailValid,
    passwordValid,
  } = useContext(authContext);

  const handlerSignIn = async () => {
    if (!(emailValid && passwordValid)) return;

    const res = await isUserExist(email);
    if (res.length === 0) {
      setEmailExist(false);
      return;
    }

    signIn(email, password);
  };

  const handlerLoginGuest = async () => {
    logInAnonymous();
  };

  const handlerSignUp = async () => {
    if (!(emailValid && passwordValid && passwordEquile)) return;

    const res = await isUserExist(email);
    if (res.length !== 0) {
      setEmailExist(true);
      signIn(email, password);
    } else await signUp(email, password);
  };

  return (
    <View style={styles.buttons}>
      <AppButton onPress={handlerLoginGuest}>
        <AppTextBold>Guest mode</AppTextBold>
      </AppButton>
      <Fade closeTriger={!(email || password)}>
        {emailExist ? (
          <Spin angle={-0.25}>
            <AppButton onPress={handlerSignIn}>
              <AntDesign
                name="arrowright"
                size={THEME.ICON_SMALL}
                color={
                  emailValid && passwordValid
                    ? THEME.LIGHT_COLOR
                    : THEME.GREY_COLOR
                }
              />
            </AppButton>
          </Spin>
        ) : (
          <Spin angle={0.25}>
            <AppButton onPress={handlerSignUp}>
              <AntDesign
                name="arrowup"
                size={THEME.ICON_SMALL}
                color={
                  emailValid && passwordValid && passwordEquile
                    ? THEME.LIGHT_COLOR
                    : THEME.GREY_COLOR
                }
              />
            </AppButton>
          </Spin>
        )}
      </Fade>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: THEME.TASK_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
