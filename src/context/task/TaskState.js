import React, { useReducer, useContext } from "react";

import { taskContext } from "./taskContext";
import { taskReducer } from "./taskReducer";
import { ADD_TASK, REMOVE_TASK, UPDATE_TASK } from "../types";
import { screenContext } from "../screen/screenContext";

export const TaskState = ({ children }) => {
  const { changeScreen } = useContext(screenContext);

  const initialState = {
    tasks: [
      { id: "1", title: "Learn reactNative" },
      { id: "2", title: "Write app" },
      { id: (Math.random()*9999999).toString(), title: "Write app" },
      { id: (Math.random()*9999999).toString(), title: "Write app" },
      { id: (Math.random()*9999999).toString(), title: "Write app" },
      { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      // { id: (Math.random()*9999999).toString(), title: "Write app" },
      
      
    ],
  };
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (title) => dispatch({ type: ADD_TASK, title });
  const removeTask = (id) => {
    changeScreen(null);
    dispatch({ type: REMOVE_TASK, id });
  };
  const updateTask = (id, title) => dispatch({ type: UPDATE_TASK, id, title });

  return (
    <taskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        removeTask,
        updateTask,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};
