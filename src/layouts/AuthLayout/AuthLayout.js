import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { AppText } from "../../ui/AppText";
import { AppButton } from "../../ui/AppButton";

import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../../themes";

import {
  FBlogin,
  FBregister,
  FBloginAnonymous,
} from "../../firebase";
import { InputEmail } from "./components/InputEmail";
import { InputPassword } from "./components/InputPassword";
import { boardContext } from "../../context/boardContext";

export const AuthLayout = () => {
  const { setUser } = useContext(boardContext);

  const [email, setEmail] = useState("kraev.mixail@gmail.com");
  const [password, setPassword] = useState("548246232Rvb");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [emailExist, setEmailExist] = useState(false);

  const handlerSignIn = async () => {
    const user = await FBlogin(email, password);

    setUser(user);
  };

  const handlerLoginGuest = async () => {
    const user = await FBloginAnonymous();

    setUser(user);
  };

  const handlerSignUp = () => {
    if (!(emailValid || passwordValid)) return;
    console.log("handlerSignUp");
    try {
      console.log("try");
      FBregister(email, password);
    } finally {
      console.log("finaly");
      handlerSignIn();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <InputEmail
          email={email}
          setEmail={setEmail}
          setEmailValid={setEmailValid}
        />
        <InputPassword
          password={password}
          setPassword={setPassword}
          setPasswordValid={setPasswordValid}
        />
      </View>
      <View style={styles.buttons}>
        <AppButton onPress={handlerLoginGuest}>
          <AppText>Guest mode</AppText>
        </AppButton>
        {email || password ? (
          <AppButton onPress={handlerSignIn}>
            {emailValid && passwordValid ? (
              <AntDesign name="arrowright" size={24} color={THEME.DARK_COLOR} />
            ) : (
              <AntDesign name="arrowright" size={24} color={THEME.RED_COLOR} />
            )}
          </AppButton>
        ) : null}
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
  inputs: {
    width: 300,
    height: 100,
    justifyContent: "space-around",
  },
  buttons: {
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
