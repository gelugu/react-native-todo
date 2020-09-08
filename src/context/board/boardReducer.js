import {
  ADD_BOARD,
  REMOVE_BOARD,
  RENAME_BOARD,
  FETCH_BOARDS,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR
} from "../types";

const handlers = {
  [ADD_BOARD]: (state, { title, id }) => ({
    ...state,
    boards: [
      ...state.boards,
      {
        id,
        title,
      },
    ],
  }),
  [REMOVE_BOARD]: (state, { id }) => ({
    ...state,
    boards: state.boards.filter((board) => board.id !== id),
  }),
  [RENAME_BOARD]: (state, { id, title }) => ({
    ...state,
    boards: state.boards.map((board) => {
      if (board.id === id) board.title = title;
      return board;
    }),
  }),

  [FETCH_BOARDS]: (state, { boards }) => ({ ...state, boards }),
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),

  DEFAULT: (state) => state,
};

export const boardReducer = (state, action) => {
  const handler = handlers[action.type] || action.DEFAULT;
  return handler(state, action);
};
