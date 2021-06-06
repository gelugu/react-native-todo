import React, { useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { THEME } from "../../../themes";
import { Fade } from "../../../ui/animations/Fade";
import { AppTextBold } from "../../../ui/AppTextBold";
import { authContext } from "../AuthContext";

export const AuthInputPasswordConfirm = ({}) => {
  const { emailExist, passwordEquile, passwordConfirm, setPasswordConfirm } =
    useContext(authContext);

  return (
    <Fade closeTriger={emailExist}>
      <View>
        <AppTextBold style={styles.label}>Confirm password:</AppTextBold>
        <TextInput
          style={{
            ...styles.input,
            borderColor: passwordEquile ? THEME.LIGHT_COLOR : THEME.RED_COLOR,
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
