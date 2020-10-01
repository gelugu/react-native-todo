import React, { useReducer, useContext } from "react";

import { boardContext } from "./boardContext";
import { boardReducer } from "./boardReducer";
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
import { Http } from "./http";

export const BoardState = ({ children }) => {
  const initialState = {
    user: null,
    boards: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const setUser = (user) => dispatch({type: SET_USER, user})

  const addBoard = async (boardTitle, tasks) => {
    clearError();
    try {
      const data = await Http.post(
        `https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards.json`,
        {
          title: boardTitle
        }
      );

      Http.patch(
        `https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards/${data.name}.json`,
        { id: data.name }
      );

      tasks.forEach(task => {
        addTask(data.name, task)
      })

      dispatch({
        type: ADD_BOARD,
        id: data.name,
        title: boardTitle,
      });
      console.log("end dispatch")
    } catch (error) {
      showError(error);
    }
  };
  const removeBoard = async (id) => {
    try {
      await Http.delete(
        `https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards/${id}.json`
      );
      dispatch({ type: REMOVE_BOARD, id });
      const data = await Http.get(
        `https://rn-todo-45132.firebaseio.com/boards.json`
      );
    } catch (error) {
      showError(`Error: ${error}`);
    }
  };
  const renameBoard = async (id, title) => {
    try {
      Http.patch(`https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards/${id}.json`, {
        title,
      });
      dispatch({ type: RENAME_BOARD, id, title });
    } catch (error) {
      showError(`Error: ${error}`);
    }
  };

  const fetchBoards = async (mode = "") => {
    if (mode !== "shadow") showLoader();
    clearError();
    try {
      const data = await Http.get(
        `https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards.json`
      );
      if (data !== null) {
        const boards = Object.values(data);
        boards.map(board => {
          if ('tasks' in board) {
            board.tasks = Object.values(board.tasks)
          }
          return board;
        })
        dispatch({ type: FETCH_BOARDS, boards });
      }
    } catch (error) {
      showError(`Error: ${error}`);
    } finally {
      hideLoader(); 
    }
  };

  const addTask = async (boardId, title) => {
    clearError();
    try {
      const data = await Http.post(
        `https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards/${boardId}/tasks.json`,
        { title, done: false }
      );
      Http.patch(
        `https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards/${boardId}/tasks/${data.name}.json`,
        { id: data.name }
      );
      dispatch({ type: ADD_TASK, boardId, taskId: data.name, title });
    } catch (error) {
      showError(error);
    }
  };
  const removeTask = async (boardId, id) => {
    try {
      await Http.delete(
        `https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards/${boardId}/tasks/${id}.json`
      );
      // changeScreen(null);
      dispatch({ type: REMOVE_TASK, boardId, id });
    } catch (error) {
      showError(`Error: ${error}`);
    }
  };
  const renameTask = async (boardId, id, title) => {
    try {
      Http.patch(`https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards/${boardId}/tasks/${id}.json`, {
        title,
      });
      dispatch({ type: RENAME_TASK, boardId, id, title });
    } catch (error) {
      showError(`Error: ${error}`);
    }
  };
  const doneTask = async (boardId, id, done) => {
    try {
      console.log(done)
      Http.patch(`https://rn-todo-45132.firebaseio.com/${state.user.uid}/boards/${boardId}/tasks/${id}.json`, {
        done,
      });
      dispatch({ type: DONE_TASK, boardId, id, done });
    } catch (error) {
      showError(`Error: ${error}`);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <boardContext.Provider
      value={{
        user: state.user,
        boards: state.boards,
        loading: state.loading,
        error: state.error,
        setUser,
        addBoard,
        removeBoard,
        renameBoard,
        fetchBoards,
        addTask,
        removeTask,
        renameTask,
        doneTask
      }}
    >
      {children}
    </boardContext.Provider>
  );
};
