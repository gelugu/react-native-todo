import {
  SET_USER,
  ADD_BOARD,
  REMOVE_BOARD,
  RENAME_BOARD,
  FETCH_BOARDS,
  ADD_TASK,
  REMOVE_TASK,
  RENAME_TASK,
  DONE_TASK,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
} from "./types";

const handlers = {
  [SET_USER]: (state, { user }) => ({ ...state, user }),

  [ADD_BOARD]: (state, { title, id }) => {
    return {
      ...state,
      boards: [
        ...state.boards,
        {
          id,
          title,
        },
      ],
    };
  },
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

  [ADD_TASK]: (state, { boardId, taskId, title }) => ({
    ...state,
    boards: state.boards.map((board) => {
      if (board.id === boardId) {
        if ("tasks" in board) {
          board.tasks = [
            ...board.tasks,
            {
              title,
              id: taskId,
              done: false,
            },
          ];
        } else {
          board.tasks = [
            {
              title,
              id: taskId,
              done: false,
            },
          ];
        }
      }

      return board;
    }),
  }),
  [REMOVE_TASK]: (state, { boardId, id }) => ({
    ...state,
    boards: state.boards.map((board) => {
      if (boardId === board.id) {
        board.tasks = board.tasks.filter((task) => task.id !== id);
      }
      return board;
    }),
  }),
  [RENAME_TASK]: (state, { boardId, id, title }) => ({
    ...state,
    boards: state.boards.map((board) => {
      if (board.id === boardId) {
        board.tasks.forEach((task) => {
          if (task.id === id) task.title = title;
        });
      }
      return board;
    }),
  }),
  [DONE_TASK]: (state, { boardId, id, done }) => ({
    ...state,
    boards: state.boards.map((board) => {
      if (board.id === boardId) {
        board.tasks.forEach((task) => {
          if (task.id === id) task.done = done;
        });
      }
      return board;
    }),
  }),

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
