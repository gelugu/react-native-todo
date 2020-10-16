import firebase from "firebase";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUKKp5H2YfhbbjZPI5z9OtEjQYuKAI-y4",
  authDomain: "rn-todo-45132.firebaseapp.com",
  databaseURL: "https://rn-todo-45132.firebaseio.com",
  projectId: "rn-todo-45132",
  storageBucket: "rn-todo-45132.appspot.com",
  messagingSenderId: "537183349588",
  appId: "1:537183349588:web:966938c7ebc1d99b2776c1",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;