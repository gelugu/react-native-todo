import React from 'react';
import {StyleSheet, View} from 'react-native'
import { Board } from '../components/Board';
import {AddBoard} from "../components/AddBoard"
import {ModalAddBoard} from "../components/ModalAddBoard"

export const BoardLayout = () => {
  return (
    <View style={styles.container}>
      <Board/>
      <AddBoard/>
      <ModalAddBoard/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

  }
})