import React, { useContext, useReducer } from "react";

import { appContext, userContext } from "./contexts";
import { userReducer } from "./userReducer";
import { SET_USER } from "./types";
import { auth } from "./firebase";

export const UserState = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  const { showLoader, hideLoader, showError, clearError } = useContext(
    appContext
  );

  const setUser = (user) => dispatch({ type: SET_USER, user });

  const isUserExist = async (email) => {
    clearError();

    const res = await auth()
      .fetchSignInMethodsForEmail(email)
      .catch((error) => {
        showError(error);
      });
    return res;
  };

  const checkAuth = async () => {
    showLoader();
    clearError();
    try {
      auth().onAuthStateChanged((user) => {
        setUser(user);
      });
    } catch (error) {
      showError(error);
    } finally {
      hideLoader();
    }
  };
  const signIn = async (email, password) => {
    await auth().setPersistence(auth.Auth.Persistence.LOCAL);

    await auth().signInWithEmailAndPassword(email, password);
    // .then((res) => {
    //   setUser(res.user);
    // });
    await checkAuth();
  };

  const signUp = async (email, password) => {
    await auth().createUserWithEmailAndPassword(email, password);
    // .catch(async (error) => {
    //   console.error(error.code, "\n", error.message);   // show error
    // });
    await auth().currentUser.updateProfile({
      displayName: email.split("@")[0],
    });
  };

  const signOut = async () => {
    await auth().signOut();
    await checkAuth();
  };

  const logInAnonymous = async () => {
    await auth()
      .signInAnonymously()
      .catch((error) => {
        console.error(error.code, error.message);
      });

    return auth().currentUser;
  };

  return (
    <userContext.Provider
      value={{
        user: state.user,
        isUserExist,
        checkAuth,
        signIn,
        signUp,
        signOut,
        logInAnonymous,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
