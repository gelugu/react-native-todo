import React, { useReducer, useContext } from "react";

import { taskContext } from "./taskContext";
import { taskReducer } from "./taskReducer";
import {
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TASKS,
} from "../types";
import { screenContext } from "../screen/screenContext";
import { Http } from "../../http";

export const TaskState = ({ children }) => {
  const { changeScreen } = useContext(screenContext);

  const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = async (title) => {
    clearError();
    try {
      const data = await Http.post(
        "https://rn-todo-45132.firebaseio.com/tasks.json",
        { title }
      );
      dispatch({ type: ADD_TASK, title, id: data.name });
    } catch (error) {
      showError(error);
    }
  };
  const removeTask = async (id) => {
    try {
      await Http.delete(
        `https://rn-todo-45132.firebaseio.com/tasks/${id}.json`
      );
      changeScreen(null);
      dispatch({ type: REMOVE_TASK, id });
    } catch (error) {
      showError(`Error: ${error}`);
    }
  };
  const updateTask = async (id, title) => {
    try {
      Http.patch(`https://rn-todo-45132.firebaseio.com/tasks/${id}.json`, {
        title,
      });
      dispatch({ type: UPDATE_TASK, id, title });
    } catch (error) {
      showError(`Error: ${error}`);
    }
  };

  const fetchTasks = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get("https://rn-todo-45132.firebaseio.com/tasks.json")
      const tasks = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TASKS, tasks });
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
    <taskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        addTask,
        removeTask,
        updateTask,
        fetchTasks,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};
