import { Dimensions } from "react-native";

export const THEME = {
  DARK_COLOR: '#2b2d42',
  GREY_COLOR: "#8d99ae",
  LIGHT_COLOR: "#edf2f4",
  RED_COLOR: "#d90429",
  LIGHT_RED_COLOR: "#ef233c",
  TEXT_COLOR: "#d7d7d7",

  FONT_SIZE: 16,
  FONT_SIZE_SMALL: 14,
  FONT_SIZE_BOLD: 18,

  HEADER_HEIGHT: Dimensions.get("screen").height - Dimensions.get("window").height,

  BORDER_WIDTH: 1,
  BORDER_BOLD_WIDTH: 3,

  BOARD_RADIUS: 20,
  BOARD_SIZE: Dimensions.get("window").width * 0.9,
  
  TASK_HEIGHT: 10,
}