// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDurGT1MoeRMvW31G34K_UWJe2chLBVqoc",
  authDomain: "learner-license-system.firebaseapp.com",
  projectId: "learner-license-system",
  storageBucket: "learner-license-system.appspot.com",
  messagingSenderId: "729508707153",
  appId: "1:729508707153:web:8b7c0622e1d7f98a173170",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider).then(async (result: any) => {
    const user = result.user
    console.log(user);      
  })
}

export const githubSignIn = () => {
  const provider = new GithubAuthProvider()
  signInWithPopup(auth, provider).then(async (result:any) => {
    const {user} = result
    console.log(user);      
  })
}
