import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { AppText } from "../../ui/AppText";
import { AppTextBold } from "../../ui/AppTextBold";
import { AppButton } from "../../ui/AppButton";

import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../../themes";

import {
  FBlogin,
  FBregister,
  FBloginAnonymous,
  isUserExist,
} from "../../firebase";
import { boardContext } from "../../context/boardContext";

export const AuthLayout = () => {
  const { setUser } = useContext(boardContext);

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
  }, [passwordConfirm]);

  const handlerOnChange = async (value) => {
    setEmail(value.trim().toLowerCase());
  };

  const handlerSignIn = async () => {
    const res = await isUserExist(email);
    if (res.length === 0) {
      setEmailExist(false);
      return;
    } else setEmailExist(true);

    const user = await FBlogin(email, password);

    setUser(user);
  };

  const handlerLoginGuest = async () => {
    const user = await FBloginAnonymous();

    setUser(user);
  };

  const handlerSignUp = async () => {
    try {
      await FBregister(email, password);
      handlerSignIn(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {emailExist ? null : (
          <AppButton
            onPress={setEmailExist.bind(null, true)}
            style={styles.buttonBack}
          >
            <AntDesign name="arrowleft" size={24} color={THEME.DARK_COLOR} />
          </AppButton>
        )}
        <AppTextBold>{emailExist ? "Sign In" : "Sign Up"}</AppTextBold>
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
          placeholder="password"
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          enablesReturnKeyAutomatically={false}
          placeholderTextColor={THEME.GREY_COLOR}
          returnKeyType={emailExist ? "go" : "next"}
        />
        {emailExist ? null : (
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
        )}
      </View>
      <View style={styles.buttons}>
        <AppButton onPress={handlerLoginGuest}>
          <AppTextBold>Guest mode</AppTextBold>
        </AppButton>
        {emailExist ? (
          email || password ? (
            emailValid && passwordValid ? (
              <AppButton onPress={handlerSignIn}>
                <AntDesign
                  name="arrowright"
                  size={24}
                  color={THEME.DARK_COLOR}
                />
              </AppButton>
            ) : (
              <AppButton onPress={() => {}}>
                <AntDesign
                  name="arrowright"
                  size={24}
                  color={THEME.GREY_COLOR}
                />
              </AppButton>
            )
          ) : null
        ) : (
          <AppButton onPress={handlerSignUp}>
            {emailValid && passwordValid && passwordEquile ? (
              <AntDesign name="arrowup" size={24} color={THEME.DARK_COLOR} />
            ) : (
              <AntDesign name="arrowup" size={24} color={THEME.GREY_COLOR} />
            )}
          </AppButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
