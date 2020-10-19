import React, { useCallback, useContext, useEffect, useReducer } from "react";

import { appContext, userContext } from "./contexts";
import { userReducer } from "./userReducer";
import { SET_USER } from "./types";
import { auth } from "./firebase";

export const UserState = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: {},
  });

  const { showLoader, hideLoader, showError, clearError } = useContext(
    appContext
  );

  useEffect(() => {
    checkAuth();
  }, [])
  
  const setUser = (user) => dispatch({ type: SET_USER, user });

  const isUserExist = async (email) => {
    clearError();

    try {
      const res = await auth().fetchSignInMethodsForEmail(email);
      return res;
    } catch (error) {
      showError(error);
    }
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
    clearError();
    showLoader();

    try {
      await auth().setPersistence(auth.Auth.Persistence.LOCAL);
      await auth().signInWithEmailAndPassword(email, password);
      await checkAuth();
    } catch (error) {
      showError(error);
    } finally {
      hideLoader();
    }
  };

  const signUp = async (email, password) => {
    showLoader();
    clearError();

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await auth().currentUser.updateProfile({
        displayName: email.split("@")[0],
      });
    } catch (error) {
      showError(error);
    } finally {
      hideLoader();
    }
  };

  const signOut = async () => {
    showLoader();
    clearError();

    try {
      await auth().signOut();
      await checkAuth();
    } catch (error) {
      showError(error);
    } finally {
      hideLoader();
    }
  };

  const logInAnonymous = async () => {
    showLoader();
    clearError();

    try {
      await auth().signInAnonymously();
      await checkAuth();
    } catch (error) {
      showError();
    } finally {
      hideLoader();
    }
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
