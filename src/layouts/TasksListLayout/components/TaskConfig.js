import React from 'react';
import { StyleSheet, View } from 'react-native';

export const TaskConfig = () => {
  return (
    <View style={styles.config}>
      <View style={styles.configHeader}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.configInput}
        />
        {title !== task.title ? (
          <AppButton onPress={renameHandler}>
            <MaterialIcons name="done" size={24} color={THEME.DARK_COLOR} />
          </AppButton>
        ) : null}
      </View>
      <View style={styles.configButtons}>
        <AppButton onPress={removeHandler}>
          <AppText style={{ color: THEME.RED_COLOR }}>Delete</AppText>
        </AppButton>
        <AppButton
          onPress={() => {
            setTitle(task.title);
            setIsConfig(false);
          }}
        >
          <AppText>Back</AppText>
        </AppButton>
      </View>
    </View>
  );
}

  const styles = StyleSheet.create({
    config: {
      width: deviceWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
      borderWidth: 0.3,
      borderColor: colors.secondary,
      borderRadius: 5,
      flexDirection: "column",
    },
    configHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    configInput: {
      fontSize: fontSize.regular,
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondary,
    },
    configButtons: {
      marginVertical: 15,
    },
});
