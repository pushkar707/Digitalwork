// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import axios from "axios";
import firebase from "firebase/compat/app";
import { emit } from "process";
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
    const {reloadUserInfo} = result.user
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/firebase",{
      name:reloadUserInfo.displayName,email:reloadUserInfo.email, profileImageUrl:reloadUserInfo.photoUrl
    })
    const data = await res.data
    console.log(data);
    
    if(data.success){
      localStorage.setItem("refreshToken",data.refreshToken)
      window.location.href = "/dashboard"
    }    
  })
}

export const githubSignIn = () => {
  const provider = new GithubAuthProvider()
  signInWithPopup(auth, provider).then(async (result:any) => {
    const {reloadUserInfo} = result.user
    // This is not how refresh token should be created. Firebase will provide me a OAuth token, which should be validated on API using firebase SDK
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/firebase",{
      name:reloadUserInfo.screenName,email:reloadUserInfo.email, profileImageUrl:reloadUserInfo.photoUrl
    })
    const data = await res.data
    console.log(data);
    
    if(data.success){
      localStorage.setItem("refreshToken",data.refreshToken)
      window.location.href = "/dashboard"
    }        
  }).catch((e) => {
    if (e.code === "auth/account-exists-with-different-credential"){
      console.log("Login with google provider");      
    }    
  })
}
