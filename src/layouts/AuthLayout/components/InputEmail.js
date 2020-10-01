import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { THEME } from "../../../themes";

export const InputEmail = ({ email, setEmail, setEmailValid }) => {
  const [emailBorder, setEmailBorder] = useState(THEME.DARK_COLOR);

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

  const handlerOnChange = (value) => {
    setEmail(value.toLowerCase().trim())
  }

  return (
    <TextInput
      style={{ ...styles.input, borderColor: emailBorder }}
      textContentType="emailAddress"
      autoFocus
      value={email}
      placeholder="email"
      onChangeText={handlerOnChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    borderWidth: THEME.BORDER_WIDTH,
    paddingHorizontal: 10,
  },
});
