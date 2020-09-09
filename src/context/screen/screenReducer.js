import { CHANGE_SCREEN, CHANGE_BOARD, SHOW_ADD_BOARD, HIDE_ADD_BOARD } from "../types";

const handlers = {
  [CHANGE_SCREEN]: (state, { taskId }) => ({ ...state, taskId }),
  [CHANGE_BOARD]: (state, { boardId }) => ({ ...state, boardId }),
  [SHOW_ADD_BOARD]: (state) => ({ ...state, addBoardModal: true }),
  [HIDE_ADD_BOARD]: (state) => ({ ...state, addBoardModal: false }),
  DEFAULT: (state) => state,
};

export const screenReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
