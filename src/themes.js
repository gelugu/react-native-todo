import { Dimensions } from "react-native";

export const THEME = {
  DARK_COLOR: "#2b2d42",
  GREY_COLOR: "#8d99ae",
  LIGHT_COLOR: "#edf2f4",
  RED_COLOR: "#d90429",
  LIGHT_RED_COLOR: "#ef233c",
  TEXT_COLOR: "#2b2d42",

  FONT_SIZE: 16,
  FONT_SIZE_SMALL: 14,
  FONT_SIZE_BOLD: 18,

  HEADER: {
    paddingTop: Dimensions.get("screen").height - Dimensions.get("window").height + 10,

  },

  HEADER_HEIGHT: Dimensions.get("screen").height - Dimensions.get("window").height + 10,

  CONTAINER_CENTER: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
    

  BORDER_WIDTH: 0.3,
  BORDER_BOLD_WIDTH: 1,

  BOARD_RADIUS: 20,
  BOARD_SIZE: Dimensions.get("window").width * 0.9,

  TASK_RADIUS: 5,
  TASK_WIDTH: Dimensions.get("window").width * 0.9,
  TASK_HEIGHT: 40,

  TASK_HEIGHT: 10,

  ANIMATION_SPEED: 300,
};
