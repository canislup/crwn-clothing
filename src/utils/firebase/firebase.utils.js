import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL3Q4MeV6vrm_XDJIoSPPSrMjRRN_-wIo",
  authDomain: "crown-clothing-db-2-f0dfd.firebaseapp.com",
  projectId: "crown-clothing-db-2-f0dfd",
  storageBucket: "crown-clothing-db-2-f0dfd.firebasestorage.app",
  messagingSenderId: "624106376403",
  appId: "1:624106376403:web:afaa9303b482fc0c14d826",
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  try {
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log("This is the user Doc ref: ", userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    // IF USER DATA DOES NOT EXIST CREATE THE USER
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log("Error creating user: ", error.message);
      }
    }

    // IF USER EXISTS ALREADY, RETURN THE USER
    return userDocRef;
  } catch (error) {
    // console.log(error);
  }
};
