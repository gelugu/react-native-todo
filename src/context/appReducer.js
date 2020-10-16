import { SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR } from "./types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),

  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),

  DEFAULT: (state) => state,
};

export const appReducer = (state, action) => {
  const handler = handlers[action.type] || action.DEFAULT;
  return handler(state, action);
};
