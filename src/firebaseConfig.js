// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import 'firebase/auth';

//제외파일

// 사용할 파이어베이스 서비스 주석을 해제합니다
import "firebase/compat/auth";
import "firebase/compat/database";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다.
const firebaseConfig = {
  apiKey: "AIzaSyC1JA0cu6yrzwxBnRDqW3jAj4AMylXJhQ0",
  authDomain: "reactstagram-13fac.firebaseapp.com",
  databaseURL:"https://reactstagram-13fac-default-rtdb.firebaseio.com/",
  projectId: "reactstagram-13fac",
  storageBucket: "reactstagram-13fac.appspot.com",
  messagingSenderId: "637417332800",
  appId: "1:637417332800:web:fd7ddf53a9e51e4715ffa5",
  measurementId: "G-TESC0VX2P7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//사용 방법입니다. 
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()
export const firebaseInstance = firebase; 
export const authService = firebase.auth();
export const imageStorage=firebase.storage();