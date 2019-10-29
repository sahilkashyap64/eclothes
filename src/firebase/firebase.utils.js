import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyBdrSMshXUG3tDsa1ZZzuUUY7NG6qfYgwo",
  authDomain: "crwn-db-b11e2.firebaseapp.com",
  databaseURL: "https://crwn-db-b11e2.firebaseio.com",
  projectId: "crwn-db-b11e2",
  storageBucket: "crwn-db-b11e2.appspot.com",
  messagingSenderId: "809188943609",
  appId: "1:809188943609:web:1b3f9a09a31be8c49fa428",
  measurementId: "G-XG8HJ0YMZB"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
