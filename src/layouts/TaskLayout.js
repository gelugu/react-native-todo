import React, {useState} from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import {THEME} from '../themes'
import { ModalEdit } from "../components/ModalEdit";

export const TaskLayout = ({goBack, task, removeTask}) => {

  const [modalEdit, setModalEdit] = useState(false)

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        <Text>{task.title}</Text>
        <Button title="edit" onPress={setModalEdit.bind(null, true)}/>
      </View>
      
      <View style={styles.buttons}>
        <Button title="<-" color={THEME.GREY_COLOR} onPress={goBack}/>
        <Button title="delete" color={THEME.RED_COLOR} onPress={removeTask.bind(null, task.id)}/>
      </View>
      <ModalEdit
        visible={modalEdit}
        setModalEdit={setModalEdit}
        value={task.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
