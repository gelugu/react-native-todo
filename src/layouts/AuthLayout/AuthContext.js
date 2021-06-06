import React, { useReducer, useState } from "react";
import { createContext } from "react";

export const authContext = createContext();

export const AuthContext = ({ children }) => {
  const [email, setEmail] = useState("blah@mail.ru");
  const [password, setPassword] = useState("12345678");
  const [passwordConfirm, setPasswordConfirm] = useState("12345678");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordEquile, setPasswordEquile] = useState(false);

  const [emailExist, setEmailExist] = useState(true);

  return (
    <authContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
        emailValid,
        setEmailValid,
        passwordValid,
        setPasswordValid,
        passwordEquile,
        setPasswordEquile,
        emailExist,
        setEmailExist,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
