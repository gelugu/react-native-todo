import {
  ADD_TASK,
  REMOVE_TASK,
  RENAME_TASK,
  SHOW_LOADER,
  HIDE_LOADER,
  CLEAR_ERROR,
  SHOW_ERROR,
  FETCH_TASKS,
} from "../types";

const handlers = {
  [ADD_TASK]: (state, { title, id }) => ({
    ...state,
    tasks: [
      ...state.tasks,
      {
        id,
        title,
      },
    ],
  }),
  [REMOVE_TASK]: (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  }),
  [RENAME_TASK]: (state, { id, title }) => ({
    ...state,
    tasks: state.tasks.map((task) => {
      if (task.id === id) task.title = title;
      return task;
    }),
  }),

  [FETCH_TASKS]: (state, { tasks }) => ({ ...state, tasks }),
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),

  DEFAULT: (state) => state,
};

export const taskReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
