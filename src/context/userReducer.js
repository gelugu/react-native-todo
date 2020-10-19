import { SET_USER } from "./types";

const handlers = {
  [SET_USER]: (state, { user }) => ({ ...state, user }),

  DEFAULT: (state) => state,
};

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || action.DEFAULT;
  return handler(state, action);
};
