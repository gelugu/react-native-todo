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

export const FBcurrentUser = () => (firebase.auth().currentUser);

export const FBlogin = async (email, password) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password).catch(async (error) => {
      if (error.code === "auth/invalid-email") {
        console.log("not registr");
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.auth().currentUser.updateProfile({
          displayName: email.split('@')[0],
        });
        await firebase.auth().signInWithEmailAndPassword(email, password);
      };
    });
  
    return firebase.auth().currentUser;
};

export const FBsignOut = () => {
  firebase.auth().signOut();
};

export const FBloginAnonymous = async () => {
  await firebase.auth().signInAnonymously().catch((error) => {
    console.log(error.code, error.message);
  });
  
  return firebase.auth().currentUser;
}