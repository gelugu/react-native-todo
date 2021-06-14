import React, { useContext, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, fontSize } from "../../../styleConfig";
import { THEME } from "../../../themes";
import { AppTextBold } from "../../../ui/AppTextBold";
import { authContext } from "../AuthContext";

export const AuthInputLogin = () => {
  const { email, setEmail, emailValid, setEmailValid } =
    useContext(authContext);

  useEffect(() => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email.trim()) === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  }, [email]);

  const handlerOnChange = (value) => {
    setEmail(value.trim().toLowerCase());
  };

  return (
    <View>
      <AppTextBold style={styles.label}>Login:</AppTextBold>
      <TextInput
        style={{
          ...styles.input,
          borderColor: emailValid ? colors.primary : colors.warn,
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
        placeholderTextColor={colors.textOpacity}
        returnKeyType="next"
        textContentType="emailAddress"
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
