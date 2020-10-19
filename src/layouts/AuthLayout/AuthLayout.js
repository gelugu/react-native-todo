import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { AppTextBold } from "../../ui/AppTextBold";
import { AppButton } from "../../ui/AppButton";
import { Fade } from "../../ui/animations/Fade";
import { Spin } from "../../ui/animations/Spin";

import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../../themes";

import { appContext, userContext } from "../../context/contexts";
import { AppLoading } from "../../ui/AppLoading";
import { AppError } from "../../ui/AppError";

export const AuthLayout = ({ navigation }) => {
  const { user, signIn, signUp, logInAnonymous, isUserExist } = useContext(
    userContext
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordEquile, setPasswordEquile] = useState(false);

  const [emailExist, setEmailExist] = useState(true);

  useEffect(() => {
    if (user) navigation.navigate("Boards");
  }, [user]);

  useEffect(() => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email.trim()) === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  }, [email]);

  useEffect(() => {
    if (password.length < 8) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  }, [password]);

  useEffect(() => {
    if (password !== passwordConfirm) {
      setPasswordEquile(false);
    } else {
      setPasswordEquile(true);
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

  return (
    <View style={styles.container}>
      <AppLoading />
      <AppError />
      <View style={styles.header}>
        <Fade style={styles.buttonBack} closeTriger={emailExist}>
          <AppButton onPress={setEmailExist.bind(null, true)}>
            <AntDesign
              name="arrowleft"
              size={THEME.ICON_SMALL}
              color={THEME.DARK_COLOR}
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
      <View style={styles.inputs}>
        <AppTextBold style={styles.label}>Login:</AppTextBold>
        <TextInput
          style={{
            ...styles.input,
            borderColor: emailValid ? THEME.DARK_COLOR : THEME.RED_COLOR,
          }}
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
          style={{
            ...styles.input,
            borderColor: passwordValid ? THEME.DARK_COLOR : THEME.RED_COLOR,
          }}
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
              style={{
                ...styles.input,
                borderColor: passwordEquile
                  ? THEME.DARK_COLOR
                  : THEME.RED_COLOR,
              }}
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
                <AntDesign
                  name="arrowright"
                  size={THEME.ICON_SMALL}
                  color={
                    emailValid && passwordValid
                      ? THEME.DARK_COLOR
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
                      ? THEME.DARK_COLOR
                      : THEME.GREY_COLOR
                  }
                />
              </AppButton>
            </Spin>
          )}
        </Fade>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...THEME.CONTAINER_CENTER,
  },
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
    width: THEME.TASK_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
