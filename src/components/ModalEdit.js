import React, {useState} from "react";
import { Modal, View, TextInput, StyleSheet, Button } from "react-native";
import { THEME } from "../themes";

export const ModalEdit = ({visible, setModalEdit, value, onSave}) => {
  const [title, setTitle] = useState(value)

  const saveHandler = () => {
    if (title.trim()) {
      onSave(title)
    }
  }

  return <Modal visible={visible} animationType='fade' transparent={true}>
    <View style={styles.wrap}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="..."
        autoFocus={true}
      />
      <Button title="save" onPress={saveHandler}/>
      <Button title='close' color={THEME.RED_COLOR} onPress={setModalEdit.bind(null, false)}/>
    </View>
  </Modal>
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "rgba(0, 0, 0, .35)",

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderBottomColor: THEME.GREY_COLOR,
    borderBottomWidth: 2,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 10,
  }

})