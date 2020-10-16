import React, { useReducer } from "react";

import { appContext } from "./contexts";
import { appReducer } from "./appReducer";
import { SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR } from "./types";

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    loading: false,
    error: null,
  });

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <appContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        showLoader,
        hideLoader,
        showError,
        clearError,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
