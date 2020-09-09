import React, { useReducer, useContext } from "react";

import { boardContext } from "./boardContext";
import { boardReducer } from "./boardReducer";
import {
  ADD_BOARD,
  REMOVE_BOARD,
  RENAME_BOARD,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_BOARDS,
} from "../types";
import { Http } from "../../http";

export const BoardState = ({ children }) => {
  const initialState = {
    boards: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const addBoard = async (board) => {
    clearError();
    try {
      const data = await Http.post(
        "https://rn-todo-45132.firebaseio.com/boards.json",
        board
      );

      setTimeout(() => {
        console.log(data)
      }, 1000)
      
      console.dir("data", data)
      dispatch({
        type: ADD_BOARD,
        title: board.title,
        tasks: board.tasks,
        id: data.name
      });
    } catch (error) {
      showError(error);
    }
  };
  const removeBoard = async (id) => {
    try {
      await Http.delete(
        `https://rn-todo-45132.firebaseio.com/boards/${id}.json`
      );
      dispatch({ type: REMOVE_BOARD, id });
    } catch (error) {
      showError(`Error: ${error}`);
    }
  };
  const renameBoard = async (id, title) => {
    try {
      Http.patch(`https://rn-todo-45132.firebaseio.com/boards/${id}.json`, {
        title,
      });
      dispatch({ type: RENAME_BOARD, id, title });
    } catch (error) {
      showError(`Error: ${error}`);
    }
  };

  const fetchBoards = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        "https://rn-todo-45132.firebaseio.com/boards.json"
      );
      const boards = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      dispatch({ type: FETCH_BOARDS, boards });
    } catch (error) {
      showError(`Error: ${error}`);
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <boardContext.Provider
      value={{
        boards: state.boards,
        loading: state.loading,
        error: state.error,
        addBoard,
        removeBoard,
        renameBoard,
        fetchBoards,
      }}
    >
      {children}
    </boardContext.Provider>
  );
};
