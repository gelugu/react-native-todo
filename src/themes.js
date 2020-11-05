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

  ICON_SMALL: 24,
  ICON_MEDIUM: 36,
  ICON_LARGE: 48,

  APP_WIDTH: Dimensions.get("screen").width,
  APP_HEIGHT: Dimensions.get("screen").height,

  LOADING: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#edf2f4",
    position: "absolute"
  },

  HEADER: {
    paddingTop: Dimensions.get("screen").height - Dimensions.get("window").height + 10,

  },

  HEADER_HEIGHT: Dimensions.get("screen").height - Dimensions.get("window").height + 10,

  CONTAINER_CENTER: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  BOARD: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    borderWidth: .3,
    borderColor: "transparent",
    borderRadius: 20,
    marginBottom: 10,
    elevation: 1.5,
  },
    
  TASK: {
    width: Dimensions.get("window").width * 0.9,
    // height: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderWidth: .3,
    borderColor: "transparent",
    borderRadius: 5,
    elevation: 1.5,
  },

  BORDER: {
    borderWidth: .3,
    borderColor: "transparent",
    borderRadius: 5,
    elevation: 1.5,
  },
    
  BORDER_WIDTH: .3,
  BORDER_BOLD_WIDTH: 1,

  BOARD_RADIUS: 20,
  BOARD_SIZE: Dimensions.get("window").width * 0.9,

  TASK_RADIUS: 5,
  TASK_WIDTH: Dimensions.get("window").width * 0.9,
  TASK_HEIGHT: 40,

  TASK_HEIGHT: 10,

  ANIMATION_SPEED: 300,
};
