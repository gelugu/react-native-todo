import { Dimensions } from "react-native";

export const THEME = {
  MAIN_COLOR: '#656565',
  GREY_COLOR: "#757575",
  RED_COLOR: "#e53935",
  TEXT_COLOR: "#d7d7d7",

  FONT_SIZE: 16,
  FONT_SIZE_BOLD: 24,

  HEADER_HEIGHT: Dimensions.get("screen").height - Dimensions.get("window").height,

  BORDER_WIDTH: 1,
  BORDER_BOLD_WIDTH: 3,

  BOARD_RADIUS: 20,
  BOARD_SIZE: Dimensions.get("window").width * 0.9,
  
  TASK_HEIGHT: 10,
}