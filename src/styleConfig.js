import { Dimensions } from "react-native";

export const colors = {
  background: "#323031",
  backgroundOpacity: "#323031aa",
  primary: "#ffc857",
  primaryOpacity: "#ffc857aa",
  secondary: "#177e89",
  secondaryOpacity: "#177e89aa",
  warn: "#db3a34",
  warnOpacity: "#db3a34aa",
  text: "#fef9ef",
  textOpacity: "#fef9efaa",
}

export const fontSize = {
  small: 16,
  regular: 18,
  bold: 20,
}

export const iconSize = {
  small: 24,
  regular: 36,
  large: 48,
}

export const statusBarHeight = Dimensions.get("screen").height - Dimensions.get("window").height;

export const deviceWidth = Dimensions.get("screen").width
export const deviceHeight = Dimensions.get("screen").height
