import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { THEME } from '../../../themes';

export const InputPassword = ({password, setPassword, setPasswordValid}) => {

  const [passwordBorder, setPasswordBorder] = useState(THEME.DARK_COLOR);

  useEffect(() => {
    if (password.length < 8) {
      setPasswordValid(false);
      setPasswordBorder(THEME.RED_COLOR);
    }
    else {
      setPasswordValid(true);
      setPasswordBorder(THEME.DARK_COLOR);
    }
    
  }, [password]);

  return (
      <TextInput
          style={{...styles.input, borderColor: passwordBorder}}
          textContentType="password"
          secureTextEntry={true}
          value={password}
          placeholder="password"
          onChangeText={setPassword}
        />
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    borderWidth: THEME.BORDER_WIDTH,
    paddingHorizontal: 10,
  },
})