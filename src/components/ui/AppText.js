import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { THEME } from '../../themes';

export const AppText = (props) => <Text style={{...styles.default, ...props.style}}>{props.children}</Text>

const styles = StyleSheet.create({
  default: {
    color: THEME.DARK_COLOR,
    fontSize: THEME.FONT_SIZE,
    fontFamily: 'rotota-regular'
  }
})