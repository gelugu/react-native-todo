import React, { useContext, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, fontSize } from "../../../styleConfig";
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
          borderColor: passwordValid ? colors.primary : colors.warn,
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
        placeholderTextColor={colors.textOpacity}
        returnKeyType={emailExist ? "go" : "next"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: fontSize.small,
  },
  input: {
    paddingHorizontal: 10,
    marginBottom: 15,

    borderWidth: 1,
    borderRadius: 5,

    color: colors.text,
    fontFamily: "CourierPrimeRegular",
  },
});
