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

export const TaskState = ({ children }) => {
  const { changeScreen } = useContext(screenContext);

  const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = async (title) => {
    const response = await fetch(
      "https://rn-todo-45132.firebaseio.com/tasks.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }
    );
    const data = await response.json();
    console.log("id", data);
    dispatch({ type: ADD_TASK, title, id: data.name });
  };
  const removeTask = (id) => {
    changeScreen(null);
    dispatch({ type: REMOVE_TASK, id });
  };
  const updateTask = (id, title) => dispatch({ type: UPDATE_TASK, id, title });

  const fetchTasks = async () => {
    showLoader();
    clearError();
    try {
      const response = await fetch(
        "https://rn-todo-45132.firebaseio.com/tasks.json",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
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
