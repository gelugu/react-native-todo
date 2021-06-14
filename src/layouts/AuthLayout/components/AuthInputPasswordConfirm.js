import React, { useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, fontSize } from "../../../styleConfig";
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
            borderColor: passwordEquile ? colors.primary : colors.warn,
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
          placeholderTextColor={colors.textOpacity}
          returnKeyType="go"
        />
      </View>
    </Fade>
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
