import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { AppTextBold } from "../../ui/AppTextBold";
import { AppButton } from "../../ui/AppButton";
import { Fade } from "../../ui/animations/Fade";
import { Spin } from "../../ui/animations/Spin";

import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../../themes";

import { appContext, userContext } from "../../context/contexts";
import { AppLoader } from "../../ui/AppLoader";

export const AuthLayout = ({ navigation }) => {
  const { loading } = useContext(appContext);
  const {
    user,
    signIn,
    signUp,
    logInAnonymous,
    isUserExist,
  } = useContext(userContext);

  const [email, setEmail] = useState("black.kitty@gmail.com");
  const [password, setPassword] = useState("1234567890");
  const [passwordConfirm, setPasswordConfirm] = useState("1234567890");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordEquile, setPasswordEquile] = useState(false);

  const [emailExist, setEmailExist] = useState(true);

  const [emailBorder, setEmailBorder] = useState(THEME.DARK_COLOR);
  const [passwordBorder, setPasswordBorder] = useState(THEME.DARK_COLOR);
  const [passwordConfirmBorder, setPasswordConfirmBorder] = useState(
    THEME.DARK_COLOR
  );

  useEffect(() => {
    if (user) navigation.navigate("Boards");
  }, [user]);

  useEffect(() => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email.trim()) === false) {
      setEmailValid(false);
      setEmailBorder(THEME.RED_COLOR);
    } else {
      setEmailValid(true);
      setEmailBorder(THEME.DARK_COLOR);
    }
  }, [email]);

  useEffect(() => {
    if (password.length < 8) {
      setPasswordValid(false);
      setPasswordBorder(THEME.RED_COLOR);
    } else {
      setPasswordValid(true);
      setPasswordBorder(THEME.DARK_COLOR);
    }
  }, [password]);

  useEffect(() => {
    if (password !== passwordConfirm) {
      setPasswordEquile(false);
      setPasswordConfirmBorder(THEME.RED_COLOR);
    } else {
      setPasswordEquile(true);
      setPasswordConfirmBorder(THEME.DARK_COLOR);
    }
  }, [password, passwordConfirm]);

  const handlerOnChange = (value) => {
    setEmail(value.trim().toLowerCase());
  };

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

  if (loading)
    return (
      <View style={styles.container}>
        <AppLoader />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Fade style={{ ...styles.buttonBack }} closeTriger={emailExist}>
          <AppButton onPress={setEmailExist.bind(null, true)}>
            <AntDesign name="arrowleft" size={24} color={THEME.DARK_COLOR} />
          </AppButton>
        </Fade>
        <Fade closeTriger={emailExist}>
          <AppTextBold>Sign Up</AppTextBold>
        </Fade>
        <Fade closeTriger={!emailExist}>
          <AppTextBold>Sign In</AppTextBold>
        </Fade>
      </View>
      <View style={styles.inputs}>
        <AppTextBold style={styles.label}>Login:</AppTextBold>
        <TextInput
          style={{ ...styles.input, borderColor: emailBorder }}
          value={email}
          onChangeText={handlerOnChange}
          placeholder="email"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          autoFocus
          enablesReturnKeyAutomatically={false}
          keyboardType="email-address"
          placeholderTextColor={THEME.GREY_COLOR}
          returnKeyType="next"
          textContentType="emailAddress"
        />
        <AppTextBold style={styles.label}>Password:</AppTextBold>
        <TextInput
          style={{ ...styles.input, borderColor: passwordBorder }}
          textContentType="password"
          secureTextEntry={true}
          value={password}
          placeholder={
            emailExist ? "Your password..." : "At least 8 characters long"
          }
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          enablesReturnKeyAutomatically={false}
          placeholderTextColor={THEME.GREY_COLOR}
          returnKeyType={emailExist ? "go" : "next"}
        />
        <Fade closeTriger={emailExist}>
          <View>
            <AppTextBold style={styles.label}>Confirm password:</AppTextBold>
            <TextInput
              style={{ ...styles.input, borderColor: passwordConfirmBorder }}
              textContentType="password"
              secureTextEntry={true}
              value={passwordConfirm}
              placeholder="password"
              onChangeText={setPasswordConfirm}
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              enablesReturnKeyAutomatically={false}
              placeholderTextColor={THEME.GREY_COLOR}
              returnKeyType="go"
            />
          </View>
        </Fade>
      </View>
      <View style={styles.buttons}>
        <AppButton onPress={handlerLoginGuest}>
          <AppTextBold>Guest mode</AppTextBold>
        </AppButton>
        <Fade closeTriger={!(email || password)}>
          {emailExist ? (
            <Spin angle={-0.25}>
              <AppButton onPress={handlerSignIn}>
                {emailValid && passwordValid ? (
                  <AntDesign
                    name="arrowright"
                    size={24}
                    color={THEME.DARK_COLOR}
                  />
                ) : (
                  <AntDesign
                    name="arrowright"
                    size={24}
                    color={THEME.GREY_COLOR}
                  />
                )}
              </AppButton>
            </Spin>
          ) : (
            <Spin angle={0.25}>
              <AppButton onPress={handlerSignUp}>
                {emailValid && passwordValid && passwordEquile ? (
                  <AntDesign
                    name="arrowup"
                    size={24}
                    color={THEME.DARK_COLOR}
                  />
                ) : (
                  <AntDesign
                    name="arrowup"
                    size={24}
                    color={THEME.GREY_COLOR}
                  />
                )}
              </AppButton>
            </Spin>
          )}
        </Fade>
      </View>
    </View>
  );
};

// header options
AuthLayout.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    ...THEME.CONTAINER_CENTER,
  },
  header: {
    paddingHorizontal: 20,
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
  label: {
    marginBottom: 5,
    fontSize: THEME.FONT_SIZE_SMALL,
  },
  inputs: {
    justifyContent: "space-around",
  },
  input: {
    paddingHorizontal: 10,
    marginBottom: 15,
    width: THEME.TASK_WIDTH,
    borderWidth: THEME.BORDER_WIDTH,
    borderRadius: THEME.TASK_RADIUS,
  },
  buttons: {
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
