import React, { useReducer } from "react";

import { screenContext } from "./screenContext";
import { screenReducer } from "./screenReducer";
import { CHANGE_SCREEN, SHOW_ADD_BOARD, HIDE_ADD_BOARD } from "../types";

export const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(screenReducer, {
    taskId: null,
    boardId: null,
    addBoardModal: false,
  });

  const changeScreen = (id) => dispatch({ type: CHANGE_SCREEN, id });
  const changeBoard = (id) => dispatch({ type: CHANGE_BOARD, id });

  const showAddBoard = () => dispatch({ type: SHOW_ADD_BOARD });
  const hideAddBoard = () => dispatch({ type: HIDE_ADD_BOARD });

  return (
    <screenContext.Provider
      value={{
        taskId: state.taskId,
        boardId: state.boardId,
        addBoardModal: state.addBoardModal,
        changeScreen,
        changeBoard,
        showAddBoard,
        hideAddBoard,
      }}
    >
      {children}
    </screenContext.Provider>
  );
};
