import React, { useContext, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
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
          borderColor: emailValid ? THEME.LIGHT_COLOR : THEME.RED_COLOR,
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
