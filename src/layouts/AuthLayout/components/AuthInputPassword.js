import React, { useContext, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { THEME } from "../../../themes";
import { AppTextBold } from "../../../ui/AppTextBold";
import { authContext } from "../AuthContext";

export const AuthInputPassword = ({}) => {
  const {
    password,
    setPassword,
    passwordValid,
    emailExist,
    passwordConfirm,
    setPasswordValid,
    setPasswordEquile,
  } = useContext(authContext);

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

  return (
    <View>
      <AppTextBold style={styles.label}>Password:</AppTextBold>
      <TextInput
        style={{
          ...styles.input,
          borderColor: passwordValid ? THEME.LIGHT_COLOR : THEME.RED_COLOR,
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
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: THEME.FONT_SIZE_SMALL,
  },
  input: {
    paddingHorizontal: 10,
    marginBottom: 15,

    width: THEME.TASK_WIDTH,

    borderWidth: THEME.BORDER_WIDTH,
    borderRadius: THEME.TASK_RADIUS,

    color: THEME.TEXT_COLOR,
  },
});
