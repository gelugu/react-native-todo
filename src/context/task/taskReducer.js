import { ADD_TASK, REMOVE_TASK, UPDATE_TASK } from "../types";

const handlers = {
  [ADD_TASK]: (state, { title }) => ({
    ...state,
    tasks: [
      ...state.tasks,
      {
        id: Date.now().toString(),
        title,
      },
    ],
  }),
  [REMOVE_TASK]: (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  }),
  [UPDATE_TASK]: (state, { id, title }) => ({
    ...state,
    tasks: state.tasks.map((task) => {
      if (task.id === id) task.title = title;
      return task;
    }),
  }),
  DEFAULT: (state) => state,
};

export const taskReducer = (state, action) => {
  const handler = handlers[action.type] || action.DEFAULT;
  return handler(state, action);
};
