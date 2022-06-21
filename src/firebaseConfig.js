// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4c-8wx4_PBzrp3wWnyXULigelFwEUIgM",
  authDomain: "college-canteen-335f7.firebaseapp.com",
  projectId: "college-canteen-335f7",
  storageBucket: "college-canteen-335f7.appspot.com",
  messagingSenderId: "1043021312598",
  appId: "1:1043021312598:web:53c09e4fe335c04994c1f7",
  measurementId: "G-W0L30SJF49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage =getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const uid = result.user.uid;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("uid", uid);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOut = () => {
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("profilePic");
  return auth.signOut();
}